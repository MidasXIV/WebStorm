
var NLP = [
    ["register","new","user","name"],
    ["display","all","users"],
    ["list","projects"],
    ["upcoming","events"],
    ["scroll"],
    ["write","program"]
];

var NLP_reply = [
    
];

var entities = [
    "program","function","array","integer","string","palindrome",
];
var Dictinonary_input = [
    "string","integer","array"
]

function orion_nlp(query) {
    
    console.log(query);
    
    var N = [];
    var E = [];
    /*
    // create an array with nodes
    var nodes = new vis.DataSet([
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'}
    ]);

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5}
    ]);

    // create a network
    var container = document.getElementById('mynetwork');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {};
    
    
    // initialize your network!
    var network = new vis.Network(container, data, options);
    */
    var object_index = 1;
    
    for (var i = 0; i < entities.length; i++) 
    {   if (query.indexOf(entities[i]) >= 0) 
        {   typeOnConsole(entities[i]); 
            
         
            var object = {
                "id"    : object_index++,
                "label" : entities[i],
            };
            //object.id = object_index++;
            //object.label = entities[i];
            N.push(object);
            
            if(object_index >= 2)
            {
                var obj = {
                    "from" : object_index -1,
                    "to"   : object_index,
                };
                E.push(obj);
            }
        }
    }
    
    var nodes = new vis.DataSet(N);
    // create an array with edges
    var edges = new vis.DataSet(E);
    // create a network
    var container = document.getElementById('mynetwork');
    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {};
    // initialize your network!
    var network = new vis.Network(container, data, options);
                
    switch(query_analysis(query))
    {
        case 0 :
    }
}

function query_analysis(query)
{
    var confidence = [];
    for (var i = 0; i < NLP.length; i++) 
    {
        var confidence_index = 0;
        for (var j = 0; j < NLP[i].length; j++) 
        {
            if (query.indexOf(NLP[i][j]) >= 0) 
            {
                confidence_index++;
                console.log(NLP[i][j]+" triggered");
            }
        }
        confidence.push(confidence_index / NLP[i].length);
        //console.log("    -    ");
    }
    console.log(confidence);
    console.log(getMaximum(confidence,true));
    console.log(getMaximum(confidence));

    var idx = getMaximum(confidence, true); /* The actual index of matching */
    var idx_val = getMaximum(confidence);

    if (idx_val == 0) 
    {
        console.log("Statement Unrecognisible");
        //pass it on to google API
        idx = -1;
    }
    
    return idx;
}

function getMaximum(arr, idx) 
{
    var index = 0, value = arr.reduce(function(pre, cur, i) 
    {   return cur > pre? (index = i) && cur : pre; });
  
    return idx? index : value;
}