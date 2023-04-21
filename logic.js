

TypeMap = new Map();

    window.onload = () => {

        incomeJson = (JSON.parse(localStorage.getItem("Income"))) || [];
        budgetJson = (JSON.parse(localStorage.getItem("Budget"))) || [];
        expenseJson = (JSON.parse(localStorage.getItem("Expense"))) || [];
        totalVal = (JSON.parse(localStorage.getItem("TotalVal"))) || [0,0,0];
        expenseType = (JSON.parse(localStorage.getItem("ExpenseType"))) || [];


        // O-----O------O------O

        
        dashBalance = document.getElementById("DasBal");
        dashIncome = document.getElementById("DasIn");
        dashExpense = document.getElementById("DasEx");

        dashIncome.innerHTML  = Number(totalVal[1]);
        dashExpense.innerHTML = Number(totalVal[2]);
        dashBalance.innerHTML = Number(totalVal[0]);


        // O-----O------O------O

        incomeChart = document.getElementById("incomeChart");
        expenseChart = document.getElementById("expenseChart");


        // O-----O------O------O


        incomeJson.forEach(task => {
            appendIncome(task);    
        });

        // O-----O------O------O
        
        expenseType.forEach(task => {
            appendBudType(task);
            updateExpenseType(task);    
        });
        
        expenseJson.forEach(task => {
            appendExpense(task);  
            // makeData(task);
            updateBudgetValue(task);

        });
        

        // O-----O------O------O


        addIncomeChart()
        addExpenseChart()


    };
    
    // x---------x----------x----------x-----------x----------x--------x
    function makeData(task){
      let tempStorage = (localStorage.getItem(`${task.type}`));
      console.log("henlo its a check");
      console.log(tempStorage);
      let calC = Number(tempStorage) +   Number(task.amount)
      localStorage.setItem(`${task.type}`, JSON.stringify(calC));
    }

    function updateBalance(val){
        console.log("Update Balance")
        totalVal[0] = Number(totalVal[0]) + val;
        console.log(totalVal[0]);
        dashBalance.innerHTML = Number(totalVal[0]);
        localStorage.setItem("TotalVal", JSON.stringify(totalVal));

    }

    function updateExpenseType(task){
        const expnType = document.getElementById("exType");
        const opt = document.createElement("option");
        console.log("this works")
        opt.innerHTML =`${task.remark}`;
        opt.setAttribute("value",`${task.remark}`);
        console.log("this works again")
        expnType.insertBefore(opt,expnType.children[0]);
    }

    function updateBudgetValue(task){

        let tempTask = (JSON.parse(localStorage.getItem(`${task.type}`)));
        let tempOgTask = (JSON.parse(localStorage.getItem(`Bud${task.type}`)));
        const tag = document.getElementById(`Bar${task.type}`);
        console.log("checking calculation value");
        console.log(tag);
        console.log(tempTask);
        console.log(tempOgTask);
          
            let calWid = ((Number(tempTask)/Number(tempOgTask.amount)))*(100);
            console.log(calWid);
            console.log(tag);

            if(calWid > 100){
                tag.setAttribute("style", `width:100%;`)
                alert("Budget Exceeded");
            }
            else{

            tag.setAttribute("style", `width:${calWid}%;`)
            console.log(tag);

            // tag.setAttribute("style",`width: ${calWid}%;`);
            }

    }

        // O-----O------O------O

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
      
        today =  dd+'-'+mm+'-'+yyyy;
        console.log(today);
        // document.getElementById("inDate").innerHTML = today;
      }

      function clearLocal(){
        window.localStorage.clear();
        location.reload();
      }

      function appendIncome(task){
        // console.log("hi");
        const inAppend = document.getElementById("incomeChk");
        const li = document.createElement("li");
        li.innerHTML = `
        <span class="color">${task.amount}</span> from <span class="color">${task.remark}</span> on <span class="color">${task.date}</span> as <span class="color">${task.type}</span>`
        inAppend.insertBefore(li, inAppend.children[0]);    
      }
     
    function appendExpense(task){
        // console.log("hi");
        const exAppend = document.getElementById("expenseChk");
            const li = document.createElement("li");
            li.innerHTML = `
            <span class="color">${task.amount}</span> from <span class="color">${task.remark}</span> on <span class="color">${task.date}</span> as <span class="color">${task.type}</span>`
            exAppend.insertBefore(li, exAppend.children[0]);    
    }

    function appendBudType(task){
        // console.log("hi");
        const buAppend = document.getElementById("budgetChk");
            const li = document.createElement("li");
            
            li.innerHTML = `<p class="inLi">${task.remark}</p>
            <div class="bar">
                <div class="bar-color" id="Bar${task.remark}" ></div>
            </div>`
            buAppend.insertBefore(li, buAppend.children[0]);    
    }

    // x---------x--------x------ Income ----x---------x----------x--------x

    
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
        
        console.log("Update Income")
        totalVal[1] = Number(totalVal[1]) + Number(amt.value);
        console.log(totalVal[1]);
        dashIncome.innerHTML  = Number(totalVal[1]);
        updateBalance(Number(amt.value));


        incomeJson.push(incomeArray);
        appendIncome(incomeArray);
        localStorage.setItem("Income", JSON.stringify(incomeJson));
        localStorage.setItem("TotalVal", JSON.stringify(totalVal));
        inForm.reset();    
        console.log("HI charts")
        location.reload();
        addIncomeChart()

    });

    // x-------x-----------x------ Expense ----x-----------x--------------x

   

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

        console.log("Update expense")
        totalVal[2] = Number(totalVal[2]) + Number(amt.value);
        console.log(totalVal[2]);
        dashExpense.innerHTML = Number(totalVal[2]);
        let expns = -Number(amt.value);  
        updateBalance(expns);
        expenseJson.push(expenseArray);
        appendExpense(expenseArray);
        localStorage.setItem("Expense", JSON.stringify(expenseJson));
        localStorage.setItem("TotalVal", JSON.stringify(totalVal));
        
        
         makeData(expenseArray);
         updateBudgetValue(expenseArray);
        
        exForm.reset();    
        console.log("HI charts")
        location.reload();
        addExpenseChart()
    });

    // x--------x-------------x---- Budget ------x--------------x------------x

    // set Budget

    const BuForm = document.getElementById("budForm");
     BuForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const amt = document.getElementById("buAmt");
        const rem = document.getElementById("buRem");
        const TypeArray = {
            amount :  amt.value,
            remark : rem.value,
        }
        localStorage.setItem(`Bud${TypeArray.remark}`, JSON.stringify(TypeArray));
        localStorage.setItem(`${TypeArray.remark}`, JSON.stringify(0));
                

        expenseType.push(TypeArray);
        appendBudType(TypeArray);
        updateExpenseType(TypeArray);

        console.log("updateExpenseType");
        localStorage.setItem("ExpenseType", JSON.stringify(expenseType));
        BuForm.reset();    
    });

    // charts

   function addIncomeChart() {

        const incomeLabels = [];
        const incomeData = [];
        incomeJson.forEach(item => {
          incomeLabels.push(item.remark);
          incomeData.push(item.amount);
        });
        const data = {
          labels: incomeLabels,
          datasets: [
            {
              data: incomeData,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(1, 142, 203)',
                'rgb(106, 144, 204)',
                'rgb(1, 142, 203)',
                'rgb(102, 55, 221)',
              ],
            },
          ],
        };
    
        const config = {
          type: 'doughnut',
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio : true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Income Sources',
              },
            },
          },
        };
    
        const myChart = new Chart(incomeChart, config);
        
        
        // const myChart2 = new Chart(this.summaryIncomeChart, config);
      }
    

      function addExpenseChart() {

        const expenseLabels = [];
        const expenseData = [];
        
        expenseType.forEach(item => {
          let tempTask = (JSON.parse(localStorage.getItem(`${item.remark}`)));
          
          expenseLabels.push(item.remark);
          expenseData.push(tempTask);
        });
        const data = {
          labels: expenseLabels,
          datasets: [
            {
              data: expenseData,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(1, 142, 203)',
                'rgb(106, 144, 204)',
                'rgb(1, 142, 203)',
                'rgb(102, 55, 221)',
              ],
            },
          ],
        };
    
        const config = {
          type: 'doughnut',
          data: data,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Expense',
              },
            },
          },
        };
    
        const myyChart = new Chart(expenseChart, config);
        // const myChart2 = new Chart(this.summaryIncomeChart, config);
      }
    
    

    



