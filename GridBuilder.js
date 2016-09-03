            /**
             * GridBuilder: class genrate valid full grid 
             **/
           var GridBuilder = new function() {
               /**
                * gridRow : nubmber of rows of grid
                * gridCol : nubmber of columns of grid
                * blocksSizes : array of blocks sizes you want to genrate
                * gridCells : array[gridRow *gridCol] if cell == 0 then it availbel else not
                * gridMap{blockSize:blockSize,indexInCurrentRow:indexInCurrentRow} :  gridMap the valid grid map with valid cell sequence
                *  
                * currentIndex : index of curent availble cell to start check and fill
                * */
                this.gridRow;
                this.gridCol;
                this.blocksSizes;
                this.gridCells;
                this.gridMap ;
                this.blockLength;
                this.currentIndex;
                /**
                 * genrat the gridCells and gridmap
                 */
                this.init = function(){
                   this.gridCells =  new Array ( this.gridRow*this.gridCol) ;
                   this.gridMap  = new Array();
                   this.currentIndex = 0 ; 
                   
                   // init grid cells with 0
                    for(var i = 0; i < this.gridRow*this.gridCol; ++i){
                                this.gridCells[i]=0;
                     }
                   console.log("almg-",this.gridCells);
                   confirm();
                }
								/**
                 * choose random block size from avialble blocksizes
                 */
                this.getRandomBlockSize = function (){
                
                  var min = 0, max = this.blocksSizes.length;
                  var r =  Math.floor(Math.random()*(max-min))+min;
                  return this.blocksSizes[r];
                }
                /**
                 * test if this block size fitted in this postion
                 **/
                this.isFit = function(blockSize){
                    /**
                     * check that this block have avialble colCount<gridRow && RowCount<gridCol
                     * and all these cells are empty cells
                     * the smartest is to check first row only but i will check every cell
                     * this.currentIndex if cell not empty
                     * update 
                     **/
                     
                     var avilableCellsOfThisRow = this.gridRow - this.currentIndex%this.gridRow ;
                     var avilableCellsOfThisCol = this.gridCol - this.currentIndex%this.gridCol ;
                     // check avialble cells
                     if(blockSize>avilableCellsOfThisRow ||  blockSize>avilableCellsOfThisCol)
                     {
                     	 console.log("Algorithm NewBlock: NotFit c1");
                        confirm();
                       return false ; 
                     }
                     // check that these cells are empty 
                     for(var r = 0; r < blockSize; ++r){
                     			 for(var c = 0; c < blockSize; ++c){
                                // i is index for this block starting from [this.currentIndex]
                           			 confirm();
                                var i  =  this.currentIndex + (r*this.gridRow) + c ;
                                if(this.gridCells[i]!=0) {
                                	
                                  console.log("Algorithm Not Fit c2");
                                  return false ; 
                                  }
                           }
                     }
                     
                     // now this block is availble to be used
                     console.log("Algorithm NewBlock Fit Success: ");
                     return true ; 
                }
                
                /**
                 * fill this blaock form this index
                 */
                this.fill = function(blockSize){
                		for(var r = 0; r < blockSize; ++r){
                     			 for(var c = 0; c < blockSize; ++c){
                            confirm();
                                // i is index for this block starting from [this.currentIndex]
                           			var i  =  this.currentIndex + (r*this.gridRow) + c ;
                                this.gridCells[i]=blockSize; 
                           }
                     }
                     
                     console.log("Algorithm grid Cells Filled : ");
                }
                
               /**
                * register valid block in palce
                */
               this.registerThisBlock = function(blockSize,indexInCurrentRow){
                  //gridMap{blockSize:blockSize,indexInCurrentRow:indexInCurrentRow} 
                  this.gridMap.push({
                  	blockSize:blockSize,
                    indexInCurrentRow:indexInCurrentRow
                  });
                  console.log("Algorithm gridMap Filled: ");
                }
                
                
               /**
                * run the algorithm
                */
               this.run = function(){
               			console.log("Algorithm STARTING RUN -",this.currentIndex , this.gridCells.length);
                    var limit = 100000 , i = 0 ;
                    while(this.currentIndex < this.gridCells.length && i++<limit){
                    			var newBlock ; 
                          do{
                          	newBlock = this.getRandomBlockSize() ;
                            //update this.currentIndex becouse we found not empty cell
                            if(this.gridCells[this.currentIndex]!=0)
                            {
                            	this.currentIndex++;
                            }
                            console.log("Algorithm NewBlock: ",newBlock);
                            confirm();
                          }
                          while(!this.isFit(newBlock)&& i++ < limit && this.currentIndex <this.gridCells.length);
                          
                         this.fill(newBlock);
                         this.registerThisBlock(newBlock,this.currentIndex);
                         
                         // update this.currentIndex
                         this.currentIndex+= newBlock ; 
                         console.log("Algorithm currentIndex updated: ", this.currentIndex);
                          
                          
                    }
               	 ;
                     
               
               }
                this.build  =  function ( gridRow, gridCol, blocksSizes){
                    this.gridRow = gridRow
                    this.gridCol =gridCol ;
                    this.blocksSizes =blocksSizes ;
                    // genrat the gridCells and gridmap
                    this.init(); 
                    this.run();
                    
                    console.log("Algorithm RESULTS -");
                    console.log("Algorithm gridCells -",JSON.stringify(this.gridCells));
                    console.log("Algorithm gridMap -",JSON.stringify(this.gridMap));
                    
                    console.log("Algorithm ENDED-"); 
                }
                 


           }
           /* build( gridRow, gridCol, blocksSizes) */
           GridBuilder.build(20,20,[1,2,3,4]);
