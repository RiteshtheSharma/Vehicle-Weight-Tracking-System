from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_restful import Resource, Api
import matplotlib.pyplot as plt
import base64
import cv2
import imutils
import numpy as np
import random
import json
import smtplib

from flask_cors import CORS  
from PIL import Image as im
# creating the flask app
i=0
app = Flask(__name__)
# creating an API object

api = Api(app)


CORS(app, resources={r"*": {"origins": "*"}})
def getLicense(image):
   
   decoded_data = base64.b64decode(image)
   
   np_data = np.frombuffer(decoded_data,'u1')
   
   img = cv2.imdecode(np_data,flags=cv2.IMREAD_COLOR)
   
   img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
   pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
   img = cv2.resize(img, (600,400) )
   img2=img.copy()[...,::-1]
   

   gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 
   gray = cv2.bilateralFilter(gray, 13, 15, 15) 

   edged = cv2.Canny(gray, 30, 200) 
   contours = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
   contours = imutils.grab_contours(contours)
   contours = sorted(contours, key = cv2.contourArea, reverse = True)[:10]
   screenCnt = None

   for c in contours:
    
       peri = cv2.arcLength(c, True)
       approx = cv2.approxPolyDP(c, 0.018 * peri, True)
 
       if len(approx) == 4:
           screenCnt = approx
           break

   if screenCnt is None:
       detected = 0
       print ("No contour detected")
   else:
        detected = 1

   if detected == 1:
       cv2.drawContours(img, [screenCnt], -1, (0, 0, 255), 3)

   mask = np.zeros(gray.shape,np.uint8)
   new_image = cv2.drawContours(mask,[screenCnt],0,255,-1,)
   new_image = cv2.bitwise_and(img,img,mask=mask)

   (x, y) = np.where(mask == 255)
   (topx, topy) = (np.min(x), np.min(y))
   (bottomx, bottomy) = (np.max(x), np.max(y))
   Cropped = img2[topx:bottomx+1, topy:bottomy+1]

   text = pytesseract.image_to_string(Cropped, config='--psm 11')

   print("Detected license plate Number is:",text)
   img = cv2.resize(img,(500,300))
   Cropped = cv2.resize(Cropped,(400,200))
   
   plt.imshow(Cropped)
   plt.show()
   
   

   return img
  
# making a class for a particular resource
# the get, post methods correspond to get and post requests
# they are automatically mapped by flask_restful.
# other methods include put, delete, etc.
class Photo(Resource):
  
    # corresponds to the GET request.
    # this function is called whenever there
    # is a GET request for this resource
    def post(self):
        
            # image=json.loads(request.data)
            # image = image['data']
            # image = np.array(image)
            image = request.data
            #x=getLicense(image)
            # im.fromarray(image).save('gfg_dummy_pic.png')
            #x=getLicense(image)
            Number_Plate = request.headers.get('textfield')
            randomWeight=random.randint(1000,30000)
            return {'Number Plate': Number_Plate, 'Weight':randomWeight} 
            #return jsonify({'Number Plate': 'RJ12CB0012', 'Driver name':'Saurabh Pareek','Class of Vehicle':'Cycle','Panelties':0,'Class Weight':20,'Date of Reg':'12-09-2022','Driver Age':21,'Address':'B-90,Durga Pura,Maliya Nagar,Jaipur','Contact No':980936118,'Adhar No':33445566778899,'Registered RTO':'Rajasthan','Driver Photo':None})
            #return ({'Number Plate': Number_Plate}) # return no plate
    # Corresponds to POST request

        
  
  

class VehicleInfo(Resource):
  
   def post(self):
        Number_Plate = json.loads(request.data)['Number_Plate']
        if Number_Plate=='':
                return jsonify({'Number Plate': Number_Plate, 'Driver name':'Saurabh Pareek','Class of Vehicle':'Cycle','Panelty':1,'Class Weight':20,'Date of Reg':'12-09-2022','Driver Age':21,'Address':'B-90,Durga Pura,Maliya Nagar,Jaipur','Contact No':980936118,'Adhar No':33445566778899,'Registered RTO':'Rajasthan','Driver Photo':None})
      
        client=MongoClient("mongodb+srv://saurabh:saurabh@cluster0.seerhtw.mongodb.net/?retryWrites=true&w=majority")
        db=client.get_database("users_db")
        records=db.users
        vehicleDetails=(records.find_one({'Number Plate':{'$eq':Number_Plate}}))
        del vehicleDetails['_id']
        del vehicleDetails['Driver Photo']
        currentWeight=random.randint(0.7*vehicleDetails['Class Weight Limit(KG)'],1.3*vehicleDetails['Class Weight Limit(KG)'])
        vehicleDetails['Current weight(KG)']=currentWeight
        if vehicleDetails['Penalties']>5:
                vehicleDetails['Message']='Vehicle Not allowed on road (License Suspended)'
        elif vehicleDetails['Penalties']<=5:
                if currentWeight>vehicleDetails['Class Weight Limit(KG)']:
                        vehicleDetails['Penalties']=vehicleDetails['Penalties']+1
                        if(vehicleDetails['Penalties'])==5:
                                vehicleDetails['Message']='Penalty Limit Exceeded (License Suspend request sent)'
                                records.update_one({'Number Plate':Number_Plate},{'$set':{'Penalties':vehicleDetails['Penalties']}})
                        else:
                                vehicleDetails['Message']='Vehicle overloaded (Penalty Applied)'
                                records.update_one({'Number Plate':Number_Plate},{'$set':{'Penalties':vehicleDetails['Penalties']}})
                else:
                        vehicleDetails['Message']='Loading Limit Followed'
        

        return vehicleDetails

         
       
        return jsonify({'Number Plate': Number_Plate, 'Driver name':'Saurabh Pareek','Class of Vehicle':'Cycle','Panelty':1,'Class Weight':20,'Date of Reg':'12-09-2022','Driver Age':21,'Address':'B-90,Durga Pura,Maliya Nagar,Jaipur','Contact No':980936118,'Adhar No':33445566778899,'Registered RTO':'Rajasthan','Driver Photo':None})
      
  
# adding the defined resources along with their corresponding urls
api.add_resource(Photo, '/photo')
api.add_resource(VehicleInfo, '/vehicle_information')
  
  
# driver function
if __name__ == '__main__':
   
         client=MongoClient("mongodb+srv://saurabh:saurabh@cluster0.seerhtw.mongodb.net/?retryWrites=true&w=majority")
         db=client.get_database("users_db")
         records=db.users
         #records.insert_one({"LPN":"rj14 rs1111","name":"ritesh sharma"})
         print("number of records are:",records.count_documents({}))
         #records.update_one({'Number Plate':Number_Plate},{'$set':{'Penalties':vehicleDetails['Penalties']}})
        
         app.run(debug = True) 