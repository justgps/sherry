package main

import (
   "github.com/robfig/cron"
   "log"
   "os"
   "time"
   "os/signal"
)

func main() {
    i := 0
    c := cron.New()
    c.AddFunc("0 */1 * * * *", func() {  // every minutes
        i++
        log.Println("start", i)
    })
    c.Start()
    defer c.Stop()
    select{} 

   go func(){
        for {
            time.Sleep(time.Second)
            log.Println("application is running.")
        }
    }()
    msgChan:=make(chan os.Signal,1)
    signal.Notify(msgChan, os.Interrupt, os.Kill)
    <-msgChan
}
