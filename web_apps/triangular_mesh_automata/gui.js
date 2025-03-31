"use strict";

// ******************************
// Funkcje pomocnicze

function Value(id){
    return document.getElementById(id).value;
}

function blockButtons() {
    document.getElementById("result-section-button-step").disabled = true;
    document.getElementById("result-section-button-startstop").disabled = true;
    document.getElementById("result-section-display-canvas").hidden = true;
    document.getElementById("result-section-stats-plot").hidden = true;
};

function unblockButtons() {
    document.getElementById("result-section-button-step").disabled = false;
    document.getElementById("result-section-button-startstop").disabled = false; 
    document.getElementById("result-section-display-canvas").hidden = false;
    document.getElementById("result-section-stats-plot").hidden = false;
}

// wykres
const chart_max_length = 20;
function plot_chart(X, Y){
    const stats_chart = new Chart("result-section-stats-plot", {
        zoomEnabled:true,
        type: "line",
        data: {
            labels: X,
            datasets: [{
                fill: true,
                backgroundColor:"rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: Y,
                max: 10,
            }]
        },
        options: {
            legend: {
                display: false,
                fontSize: 20
            },
            title: {
                display: true,
                text: "Cells alive (%)",
                fontSize: 20
              },
            elements: {
            point:{
                radius: 0
            }},
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

const triangle_width_unit = 24;
const triangle_height_unit = triangle_width_unit * (3**(1/2))/2;

// p5.js setup do instantiacji
const result_canvas_setup = (object) => {

    let width = Value('settings-section-width')*triangle_width_unit/2 + triangle_width_unit/2; 
    let height = Value('settings-section-height')*triangle_height_unit; 

    object.setup = function() {
        object.createCanvas(width, height);
    };   
}

/*
    triangle(x1,y1,x2,y2,x3,y3)

    Wiersz parzysty - najpierw typ1, potem typ2
    Wiersz nieparzysty - najpierw typ2, potem typ1

    Różnica wysokości między wierszami zawsze wynosi a/2 * 3^(1/2)
    Wiersze nieparzyste zaczynają z dodatkowym przesunięciem a/2
*/
function drawTriangle(context, type, x_offset, y_offset){
    if(type=="even"){
        context.triangle( 
            x_offset, y_offset, 
            x_offset + triangle_width_unit/2, y_offset + triangle_height_unit,
            x_offset + triangle_width_unit, y_offset );
    }
    else if(type=="odd"){
        context.triangle( 
            x_offset + triangle_width_unit/2, y_offset, 
            x_offset, y_offset + triangle_height_unit,
            x_offset + triangle_width_unit, y_offset + triangle_height_unit );
    }
}

function drawAutomataSpace(context, automata){
    context.background('white');
    for(let i=0; i<Value('settings-section-height'); i++){
        let y_offset = triangle_height_unit*i;
        for(let j=0; j<Value('settings-section-width'); j++){
            let x_offset = triangle_width_unit/2*j;
            if( automata.getCell(j,i) == 0 ){
                context.fill(0,0,0,127); // wszystko po fillu jest kolorowane
            }
            else{
                context.fill(0,127,255,255);
            }

            if( (i+j)%2==0 ){
                drawTriangle(context, "even", x_offset, y_offset);
            }
            else{
                drawTriangle(context, "odd", x_offset, y_offset);
            }
        }
    }
}

// main
window.addEventListener("load", ()=>{

    // Obsługa statystyk
    let epoch_counter = 0;
    const stats = {
        X: [],
        Y: []
    };
    function updateStats(){
        stats.Y[epoch_counter] = automata.getDensity();
        stats.X[epoch_counter] = epoch_counter;
        epoch_counter++;
    };
    function updateChart(){
        updateStats();
        plot_chart( stats.X, stats.Y );
    }

    // Deklaracja wyświetlacza
    let display = undefined;

    // Przyciski
    // Start/Stop i Step są początkowo zablokowane
    blockButtons();

    // Deklaracja zmiennych do kierowania ewolucją
    let interval = undefined;
    let automata_active = false;

    document.getElementById("result-section-button-generate").addEventListener("click", ()=>{

        // Zatrzymanie ewolucji (jeżeli była włączona)
        document.getElementById("result-section-button-startstop").innerHTML = "START";
        clearInterval(interval);
        automata_active = false;
        
        // Ustawienie parametrów
        console.log("GENERATE clicked");
        console.log(`width: ${Value("settings-section-width")}`);
        console.log(`height: ${Value("settings-section-height")}`);
        
        // init automatu
        automata.init(Value("settings-section-width"), Value("settings-section-height"))
        automata.setAllCellsRandomly();  
        // automata.setCell(0,1);
        // automata.setCell(automata.getWidth() * automata.getHeight() -1,1);

        // init wyświetlacza
        document.getElementById('result-section-display-canvas').innerHTML = '';
        display = new p5(result_canvas_setup, 'result-section-display-canvas'); 

        // wyrysowanie początkowej przestrzeni 
        drawAutomataSpace(display, automata);
        automata.printSpace();

        // czyszczenie statystyk
        stats.X = []
        stats.Y = []
        epoch_counter = 0;

        // zapoczątkowanie wykresu statystyk
        updateChart();

        // Dodanie zasad
        let rules_stay = document.getElementsByName('rule_stay');
        for( let i=0; i<rules_stay.length; i++ ){
            if( rules_stay[i].checked ){
                let new_rule = {
                    type: RuleType.Stay,
                    value: rules_stay[i].value
                }
                automata.addRule(new_rule);
                console.log('Rule stay' + rules_stay[i].value);
            }
            
        }
        let rules_born = document.getElementsByName('rule_born');
        for( let i=0; i<rules_born.length; i++ ){
            if( rules_born[i].checked ){
                let new_rule = {
                    type: RuleType.Born,
                    value: rules_born[i].value
                }
                automata.addRule(new_rule);
                console.log('Rule born' + rules_born[i].value);
            }
            
        }

        // aktywacja pozostałych przycisków
        unblockButtons();
        
    });

    document.getElementById("result-section-button-step").addEventListener("click", ()=>{
        automata.evolve(1);
        updateChart();
        drawAutomataSpace(display, automata);
    });

    document.getElementById("result-section-button-startstop").addEventListener("click", ()=>{
        console.log("STARTSTOP clicked");
        let delay = Value("settings-section-delay");
        console.log(`epoch: ${Value("settings-section-delay")}`);
        
        if( automata_active == false ){
            document.getElementById("result-section-button-startstop").innerHTML = "STOP";
            interval = setInterval(
                ()=>{
                    automata.evolve(1);
                    updateChart();
                    drawAutomataSpace(display, automata);
                },
                delay
            )
            automata_active = true;
        }
        else{
            document.getElementById("result-section-button-startstop").innerHTML = "START";
            clearInterval(interval);
            automata_active = false;
        }

    });

    // DEBUG
    console.log("main window finished loading");
    document.getElementById("button-debug").addEventListener("click", ()=>{
        automata.printRules();
    });

});