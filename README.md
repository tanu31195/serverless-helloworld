# Serverless with AWS <https://aws.amazon.com/serverless/>

[AWS Lambda resources](https://aws.amazon.com/lambda/resources/?aws-lambda-resources-blog.sort-by=item.additionalFields.createdDate&aws-lambda-resources-blog.sort-order=desc#Tutorials)

[Getting started with the serverless framework](https://www.youtube.com/watch?v=LXB2Nv9ygQc&ab_channel=Serverless)

[Introduction to AWS Lambda & Serverless Applications](https://www.youtube.com/watch?v=EBSdyoO3goc&ab_channel=AmazonWebServices)

Serverless means,

- No servers/infrastructure to manage
- Scales with usage and flexibility
- Pay for value (If idle no costs)
- High Availability and fault tolerance
- Load is automatically accommodated
- Scaling down is automatic and instant (Scale to 0)

Serverless is about abstracting the infrastructure needs as a simple configuration
Can be complex and time consuming to manually configure below AWS services

## API Gateway

- Provides endpoints to make REST requests (API frontend for multiple micro-services)
- No load to manage, has capacity for 10 000 requests per second default with burst 5000 and can be increased
- Request body validation
- Authorizer integration; Cognito or custom lambda
- Bills per request; no minimum fee
- DDoS protection

## Simple Storage Service (S3)

- File/Object store
- Infinite storage
- Pay per GB and for traffic
- Can host a static website

## DynamoDB

- A fully managed, NoSQL solution
- Infinite scaling
- No minimum fee and pay per stored GB
- 40 000 RCU and WCU capacity
- Unlimited table size and quantity of data

## Lambda <https://aws.amazon.com/lambda/>

Announced in reinvent 2014
Serverless service you only pay for what you use and without any type of application or backend service with zero administration
Pay per execution time and memory (CPU based workload)
Default 1000 simultaneous Lambda instances
Smart resource allocation

- AWS Lambda handles
- Load balancing
- Autoscaling
- Handling Failures
- OS management
- Utilization management

### Lambda API

Provided by Lambda service
Supports sync and async

### Lambda use cases

- Web Applications
- Back-ends
- Data processing
- Chat bots
- IT automation

## Serverless Framework <https://github.com/serverless/serverless>

- Above managed services are defined as a configuration (.yaml) and code
- CLI tool to execute commands based on configuration
- Makes deployment infrastructure portable
- Possible to configure cross vendor

`npm i -g serverless`
`which serverless`
`serverless --help`
