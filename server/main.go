package main

import (
  "encoding/json"
  "log"
  "net/http"
  "time"
)

type DateTime struct {
  Date string
  Time string
  Text string
}

func helloWorldHandler(w http.ResponseWriter, r *http.Request){

  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
  w.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, Accept-Encoding")

  now := time.Now()
  dateTime := DateTime{
    Date: now.Format("02-01-2006"),
    Time: now.Format("15:04:05"),
    Text: "Hello world!!!",
  }

  dateTimeJson, err := json.Marshal(dateTime)
  if err != nil{
    panic(err)
  }

  log.Println("SENDING HELLO WORLD")
  w.WriteHeader(200)  // http.StatusOK
  w.Header().Set("Content-Type","application/json")
  w.Write(dateTimeJson)
}

func disableCors(h http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
  w.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, Accept-Encoding")
  if r.Method == "OPTIONS" {
    w.Header().Set("Access-Control-Max-Age", "86400")
    w.WriteHeader(http.StatusOK)
    return
  }
  h.ServeHTTP(w, r)
 })
}

func main() {
  buildHandler := http.FileServer(http.Dir("/home/asta/fun/client/build"))
  http.Handle("/", disableCors(buildHandler))
  //http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
  //  buildHandler.ServeHTTP(w, r)
  //})

  http.HandleFunc("/test", helloWorldHandler)

  // Start the web server at port 3000.
  log.Println("Now server is running on port 3000")
  log.Fatal(http.ListenAndServe(":3000", nil))
}
