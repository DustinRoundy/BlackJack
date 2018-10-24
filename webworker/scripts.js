let w;

function startWorker(){
    if(typeof(Worker) != "undefined"){ //Checks browser support (if browser know what a worker is)
        if(typeof(w) == "undefined"){ // If w has been assigned to instance of worker
            w = new Worker("worker.js"); //Creating a new worker
        }
        w.onmessage = function(event){
            document.getElementById("output").innerHTML = event.data;
        }
    }
    else { //Browser does not know what a worker is (IE)
        document.getElementById("output").innerHTML = "Your browser is unsupported."
    }
}

function stopWorker(){
    w.terminate();
    w = undefined;
}