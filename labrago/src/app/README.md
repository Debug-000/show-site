# App
### Prerequisites
1. Postgresql with an empty database
### This is a skeleton app set up to use our api
1. Setup environment variables:
   - ```cd src/app```
   - ```cp .env.example .env```
   - populate variables with relevant values
2. configurations to get the private repository ```github.com/GoLabra/labrago/src/api```
   - ```export GOPRIVATE=github.com/GoLabra/labrago```
3. for backend development of api:
   - add the following line in go.mod:
   - ``` replace github.com/GoLabra/labrago/src/api => <absolute path to repository>/src/api ``` where absolute path to repository is your local absolute path to the repository
4. run go generate in src/app
   - ```go generate ./...```
5. in case previous go generate fails, run:
   - ```go mod tidy ``` 
   - ```go generate ./...```
6. in order to run the app, go to src/cli and run:
   - ```cd ../cli```
   - ```go run main.go start```
