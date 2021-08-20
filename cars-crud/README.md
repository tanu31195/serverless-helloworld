serverless deploy --stage dev



Serverless: Configuration warning at root: unrecognized property 'environment'
Serverless:  
Serverless: Learn more about configuration validation here: http://slss.io/configuration-validation
Serverless:  
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service cars-crud.zip file to S3 (10.86 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.....................
Serverless: Stack update finished...
Service Information
service: cars-crud
stage: dev
region: us-east-1
stack: cars-crud-dev
resources: 34
api keys:
  None
endpoints:
  POST - https://yit1gxqol4.execute-api.us-east-1.amazonaws.com/dev/v1/car
  GET - https://yit1gxqol4.execute-api.us-east-1.amazonaws.com/dev/v1/car
  GET - https://yit1gxqol4.execute-api.us-east-1.amazonaws.com/dev/v1/car/{name}
  PUT - https://yit1gxqol4.execute-api.us-east-1.amazonaws.com/dev/v1/car/{name}
  DELETE - https://yit1gxqol4.execute-api.us-east-1.amazonaws.com/dev/v1/car/{name}
functions:
  create: cars-crud-dev-create
  list: cars-crud-dev-list
  get: cars-crud-dev-get
  update: cars-crud-dev-update
  delete: cars-crud-dev-delete
layers:
  None
Serverless: Deprecation warnings:

All functionalities as provided by this plugin are now supported by Serverless Framework natively:
npm install --save-dev serverless-pseudo-parameters

`Resource: arn:aws:dynamodb:#{AWS::Region}:#{AWS::AccountId}:table/${self:service}-cars-${opt-stage}`

#{AWS::Region} this is from the pseudo parameters plugin

Allows to use the CloudFormation Pseudo Parameters in the serverless.yml.


Allows access to dynamodb and the specific table

iamRoleStatements:
   - Effect: "Allow"
     Action:
      - dynamodb:PutItem
      - dynamodb:Scan*
      - dynamodb:GetItem
      - dynamodb:UpdateItem
      - dynamodb:DeleteItem
     Resource: arn:aws:dynamodb:#{AWS::Region}:#{AWS::AccountId}:table/${self:service}-cars-${opt-stage}


Check logs for specific function
serverless logs -f functionName --stage dev

Remove the stack
serverless remove --stage dev