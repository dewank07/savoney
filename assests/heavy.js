
    window.onload = () => {
        incomeJson = (JSON.parse(localStorage.getItem("Income"))) || [];
        budgetJson = (JSON.parse(localStorage.getItem("Budget"))) || [];
        expenseJson = (JSON.parse(localStorage.getItem("Expense"))) || [];
        totalVal = (JSON.parse(localStorage.getItem("TotalVal"))) || [0,0,0];

        dashBalance = document.getElementById("DasBal");
        dashIncome = document.getElementById("DasIn");
        dashExpense = document.getElementById("DasEx");

        dashIncome.innerHTML  = Number(totalVal[1]);
        dashExpense.innerHTML = Number(totalVal[2]);
        dashBalance.innerHTML = Number(totalVal[0]);



        incomeJson.forEach(task => {
            console.log("hi");
            const inAppend = document.getElementById("incomeChk");
            const li = document.createElement("li");
            li.innerHTML = `
            <span class="color">${task.amount}</span> from <span class="color">${task.remark}</span> on <span class="color">${task.date}</span> as <span class="color">${task.type}</span>`
            inAppend.insertBefore(li, inAppend.children[0]);    
        });

        expenseJson.forEach(task => {
            console.log("hi");
            const exAppend = document.getElementById("expenseChk");
            const li = document.createElement("li");
            li.innerHTML = `
            <span class="color">${task.amount}</span> from <span class="color">${task.remark}</span> on <span class="color">${task.date}</span> as <span class="color">${task.type}</span>`
            exAppend.insertBefore(li, exAppend.children[0]);    
        });

        getDate();

    };
    
    // x---------x----------x----------x-----------x----------x--------x
    
    function updateBalance(){
        
        totalVal[0] = Number(totalVal[0]) + Number(totalVal[1]) - Number(totalVal[2]);
        console.log(totalVal[2]);
        dashBalance.innerHTML = Number(totalVal[0]);
        localStorage.setItem("TotalVal", JSON.stringify(totalVal));

    }

    function getDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
      
        if(dd<10) {
            dd = '0'+dd
        } 
      
        if(mm<10) {
            mm = '0'+mm
        } 
      
        today = yyyy + '/' + mm + '/' + dd;
        console.log(today);
        document.getElementById("inDate").innerHTML = today;
      }

    // x---------x----------x----------x-----------x----------x--------x

    function appendIncome(task){
            // console.log("hi");
            const inAppend = document.getElementById("incomeChk");
            const li = document.createElement("li");
            li.innerHTML = `
            <span class="color">${task.amount}</span> from <span class="color">${task.remark}</span> on <span class="color">${task.date}</span> as <span class="color">${task.type}</span>`
            inAppend.insertBefore(li, inAppend.children[0]);    
    }
    
    const inForm = document.getElementById("incomeForm");
    inForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const amt = document.getElementById("inAmt");
        const dat = document.getElementById("inDate");
        const rem = document.getElementById("inRem");
        const typ = document.getElementById("inType");
        const incomeArray = {
            amount :  amt.value,
            date   : dat.value || getDate(),
            remark : rem.value,
            type   : typ.value
        }
        
        totalVal[1] = Number(totalVal[1]) + Number(amt.value);
        console.log(totalVal[1]);
        dashIncome.innerHTML  = Number(totalVal[1]);
        updateBalance();


        incomeJson.push(incomeArray);
        appendIncome(incomeArray);
        localStorage.setItem("Income", JSON.stringify(incomeJson));
        localStorage.setItem("TotalVal", JSON.stringify(totalVal));

        inForm.reset();    
    });

    // x-------x-----------x----------x-----------x--------------x

    function appendExpense(task){
        // console.log("hi");
        const exAppend = document.getElementById("expenseChk");
            const li = document.createElement("li");
            li.innerHTML = `
            <span class="color">${task.amount}</span> from <span class="color">${task.remark}</span> on <span class="color">${task.date}</span> as <span class="color">${task.type}</span>`
            exAppend.insertBefore(li, exAppend.children[0]);    
    }

    const exForm = document.getElementById("expenseForm");
    exForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const amt = document.getElementById("exAmt");
        const dat = document.getElementById("exDate");
        const rem = document.getElementById("exRem");
        const typ = document.getElementById("exType");
        const expenseArray = {
            amount :  amt.value,
            date   : dat.value,
            remark : rem.value,
            type   : typ.value
        }

        totalVal[2] = Number(totalVal[2]) + Number(amt.value);
        console.log(totalVal[2]);
        dashExpense.innerHTML = Number(totalVal[2]);
        updateBalance();
        expenseJson.push(expenseArray);
        appendExpense(expenseArray);
        localStorage.setItem("Expense", JSON.stringify(expenseJson));
        localStorage.setItem("TotalVal", JSON.stringify(totalVal));

        exForm.reset();    
    });

    // x--------x-------------x------------x--------------x------------x




