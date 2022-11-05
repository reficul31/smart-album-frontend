# Smart Album Frontend
A smart photo album which web application that can be searched using natural language through both text and voice. Uploaded photos are automatically tagged using Computer Vision and user provided labels. These labels are then used for searching the smart album for results and display them back to the user.

## Demo
Demo              |  Demo 
:-------------------------:|:-------------------------:
![Demo 1](/assets/image-1.png)  |  ![Demo 2](/assets/image-2.png)
![Demo 3](/assets/image-3.png)  |  ![Demo 4](/assets/image-4.png)

## Objective
1. Build a simple frontend application that allows users to:
    * i. Make search requests to the GET /search endpoint
    * ii. Display the results (photos) resulting from the query
    * iii. Upload new photos using the PUT /photos
2. Create a S3 bucket for your frontend (B1).
3. Set up the bucket for static website hosting (same as HW1).
4. Upload the frontend files to the bucket (B2).
5. Integrate the API Gateway-generated SDK (SDK1) into the frontend, to connect your API.
6. Give the frontend user the choice to use voice rather than text to perform
the search.
7. Use Amazon Transcribe10 on the frontend to transcribe speech to text (STT) in real time, then use the transcribed text to perform the search, using the same API like in the previous steps.

In the upload form, allow the user to specify one or more custom labels, that will be appended to the list of labels detected automatically by Rekognition (see 2.d.iii above). These custom labels should be converted to a comma-separated list and uploaded as part of the S3 object’s metadata9 using a x-amz-meta-customLabels metadata HTTP header.
For instance, if you specify two custom labels at upload time, “Sam” and “Sally”, the metadata HTTP header should look like: ‘x-amz-meta-customLabels’: ‘Sam, Sally’

## Architecture
![Architecture](/assets/design.png)

