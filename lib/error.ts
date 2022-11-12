  function throwIfStringHasADotAnythingInItsName(string:string) {
      
      if(string.match(/(\.)/)) {
        
        throw new Error(`
        Don't use dot astro when specifying a path to the layout .
        You have to append .astro the extension so we do that for you.

        Please change this ${string}
        
        `);
        
      }
    }


    function throwIfStringHasAForwardSlashAtTheBeginning(string:string) {

    if(string.match(/^\//)) {
        
        throw new Error(`
        Don't use a forward slash specifying a path to the layout.

        You would have to append forward slash  so we do that for you.

        Please change this ${string}
        
        `);
        
      }
  
  }

  
  export {throwIfStringHasADotAnythingInItsName, throwIfStringHasAForwardSlashAtTheBeginning}