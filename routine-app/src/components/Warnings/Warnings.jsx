import React from "react";

function Warnings(props){
    return (
        <div>
        {props.showFilledWarning && props.createButtonClicked &&
            <div className="warning">
             <button onClick={props.closeFilledWarning} className= "warning-button"> close </button>
             <p className="warningText"> Warning: All entries on table must be filled! </p>
             </div>}
             {props.dtWarning && 
             <div  className="warning">
             <button onClick={props.closeDeleteWarning} className= "warning-button"> close </button>
             <p className="warningText"> Warning: Table must have atleast one row! </p>
             </div>
             }
              {props.showTimeWarning && props.createButtonClicked &&
             <div  className="warning">
             <button onClick={props.closeTimeWarning} className= "warning-button"> close </button>
             <p className="warningText"> Warning: Invalid start and end times! </p>
             </div>
             }
              {props.showTimeWarning2 && props.createButtonClicked &&
             <div  className="warning">
             <button onClick={props.closeTimeWarning2} className= "warning-button"> close </button>
             <p className="warningText"> Warning: Times of tasks overlap! </p>
             </div>
             }
        </div>
        );
}

export default Warnings;