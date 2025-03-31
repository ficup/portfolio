const state_set = [ 0, 1 ];
const ruleset_size = 7;
const RuleType = {
    Stay: 0,
    Born: 1
};

/*
    Zasady postaci:
    STAY: 3, 4, 8
    BORN: 2, 4
    Gdzie liczby oznaczają ilość żywych sąsiadów (stan 1)
 */
/* Położenia sąsiednich trójkątów na siatcę 1D:
    (L - szerokość w 2D, i - indeks trójkątu):
    i-L-1, i-L, i-1,
    i+1, i+L, i+L+1
*/
const automata = {
    width: undefined,
    height: undefined,
    length1d: undefined,
    rules_stay: undefined,
    rules_born: undefined,
    current_density: undefined, // % alive
    neighbour_pos: undefined,

    init: (width, height) => {
        this.width = width;
        this.height = height;
        this.length1d = width*height;

        this.space = Array(this.length1d).fill(0);
        this.rules_stay = Array(ruleset_size).fill(false);
        this.rules_born = Array(ruleset_size).fill(false);
        this.current_density = 0;

        // względna pozycja sąsiada
        this.neighbour_pos = [
            -this.width - 1,
            -this.width,
            -1,
            1,
            this.width,
            Number(this.width) + Number(1)
        ];
        
        automata.setAllCellsToZero();
    },
    addRule: (new_rule) => {
        // Uwaga - przy arrayu złożonym z obiektów, które posiadają wewnętrzny array,
        // trzeba uważać, czy kilka z nich nie używają tego samego arrayu

        if( new_rule.type == RuleType.Stay ){
            this.rules_stay[new_rule.value] = true;
        }
        else if( new_rule.type == RuleType.Born ){
            this.rules_born[new_rule.value] = true;
        }
    },
    removeRule: (rule) =>{
        if( rule.type == RuleType.Stay ){
            this.rules_stay[new_rule.value] = false;
        }
        else if( rule.type == RuleType.Born ){
            this.rules_born[new_rule.value] = false;
        }
    },
    cleanRules: () =>{
        this.rules_stay = Array(ruleset_size).fill(0);
        this.rules_born = Array(ruleset_size).fill(0);
    },
    mapTo1D: (w_idx, h_idx) => {
        return this.width*h_idx + w_idx;
    },
    mapTo2D: (l_idx) =>{
        temp = l_idx - int(l_idx/this.width);
        return [ int(l_idx/this.width), temp ];
    },
    setCell: (l_idx, value) => {
        if(value == 1 && this.space[l_idx] != 1){
            this.current_density += 1/(this.length1d);
        }
        else if(value == 0 && this.space[l_idx] != 0){
            this.current_density -= 1/(this.length1d);
        }
        this.space[l_idx] = value;
    },
    getCell: (l_idx) => {
        return this.space[l_idx];
    },
    getCell: (w_idx, h_idx) => {
        let l_idx = automata.mapTo1D(w_idx, h_idx);
        return this.space[l_idx];
    },
    setWidth: (value) =>{
        this.width = value;
    },
    setHeight: (value) =>{
        this.height = value;
    },
    setAllCells: (value) => {
        for(let i=0; i<this.length1d; i++){    
            automata.setCell(i, value);
        }
    },
    setAllCellsToZero: () => {
        automata.setAllCells(0);
    },
    setAllCellsRandomly: () => { // Wersja bez ustawiania gęstości
        for(let i=0; i<this.length1d; i++){
            let r = Math.random();
            value = r < 0.5 ? 1 : 0;
            automata.setCell(i, value);
        }
    },
    //TODO
    applyRules: (l_idx) => {

        // suma żywych sąsiadów
        let neighbours_count = 0;
        for(let i=0; i<this.neighbour_pos.length; i++){
            let temp = Number(l_idx) + Number(this.neighbour_pos[i]);

            // Przestrzeń jest sklejona na krawędziach
            
            temp  = ( temp >= this.length1d ) ? temp - this.length1d : temp;
            temp  = ( temp < 0 ) ? this.length1d + temp : temp;
            // console.log(`x ${temp}`)

            if( this.space[ temp ] == 1){
                neighbours_count++;
            }
        }
        if( (this.rules_born[neighbours_count] == true)  && ( this.space[l_idx] == 0 ) ){
            return 1;
        }
        if( ( this.rules_stay[neighbours_count] == true ) && ( this.space[l_idx] == 1 ) ){
            return 1;
        }
        return 0 ;

    },
    getWidth: () => {
        return this.width;
    },
    getHeight: () => {
        return this.height;
    },
    getLength: () => {
        return this.length1d;
    },
    getRules: () => {
        return this.rules;
    },
    getDensity: () => {
        return this.current_density;
    },
    printSpace: () => {
        // Wersja debuggingu na konsoli
        for(let i=0; i<this.height; i++){
            let line = '';
            for(let j=0; j<this.width; j++){
                line += this.space[automata.mapTo1D(j,i)] + ' ';
            }
            console.log(`${line}\n`);
        }
        console.log(`\ndens: ${this.current_density}`);
    },
    printRules: () => {
        // Wersja debuggingu na konsoli
        console.log(`Stay: ${this.rules_stay}`);
        console.log(`Born: ${this.rules_born}`);
    },
    updateSpace: () => {
        let ones_counter = 0;
        temp_space = Array(this.length1d).fill(0);
        for(let i=0; i<this.length1d; i++){
            let temp = automata.applyRules(i);
            if( temp == 1 ){
                ones_counter++;
            }
            temp_space[i] = temp;
        }
        this.current_density = ones_counter/(this.length1d);
        this.space = temp_space;
    },
    evolve: (n_epochs) => {
        for(let i=0; i<n_epochs; i++){
            automata.updateSpace();
            automata.printSpace();
        }
    }
};