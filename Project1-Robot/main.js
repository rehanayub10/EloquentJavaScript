const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
  ];

  function buildGraph(edges) { 
      //convert start-end into 2 element arrays containing start and end as seperate strings
    let graph = Object.create(null);
    function addEdge(from, to) {
      if (graph[from] == null) {
        graph[from] = [to];
      } else {
        graph[from].push(to);
      }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
      addEdge(from, to);
      addEdge(to, from);
    }
    return graph;
  }
  
  const roadGraph = buildGraph(roads);
  //console.log(roadGraph);

  class VillageState {
      constructor(place,parcels) {
          this.place = place;
          this.parcels = parcels;
      }

      move(destination) {
          if(!roadGraph[this.place].includes(destination)){
              //check whether road from current place to destination
              return this;
              //if not, don't move
          } else {
              let parcels = this.parcels.map(p => {
                  if(p.place != this.place) return p;
                  return {place:destination, address: p.address}
                  //move parcels from source to destination
              }).filter(p => p.place != p.address);
              //remove delivered parcels from list
              return new VillageState(destination, parcels);
          }
      }
  }
  