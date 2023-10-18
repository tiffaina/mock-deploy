import '../styles/main.css';

interface HistoryObject {
    command: string;
    result: string[][];
  }
interface REPLHistoryProps{
    // TODO: Fill with some shared state tracking all the pushed commands
    // CHANGED
    history: HistoryObject[]
    outputMode: string;
}
// Turn all history elements into an html table
function makeHTMLTable(myArray: string[][]) {
    return (
      <table className='centered-table'>
        <tbody>
          {myArray.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className='table-cell'>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  //Generate History
export function REPLHistory(props : REPLHistoryProps) {
    if(props.outputMode == "verbose") {
        return (
            <div className="repl-history">
                {/* This is where command history will go */}
                {/* TODO: To go through all the pushed commands... try the .map() function! */}
                {/* CHANGED */}
                {props.history.map((item, index) => (
                    <div>
                        <div>
                            Command: {item.command}
                        </div>
                        <div>
                            Result: {makeHTMLTable(item.result)}
                        </div>
                        <br /> 
                        <hr className="output-separator" />
                    </div>
                ))}
            </div>
        );
    } else {
        return(
            <div className="repl-history">
                {/* This is where command history will go */}
                {/* TODO: To go through all the pushed commands... try the .map() function! */}
                {/* CHANGED */}
                {props.history.map((item, index) => (
                    <div>
                        Result: {makeHTMLTable(item.result)}
                        <hr className="output-separator" />
                    </div>
                ))}
            </div>
        );
     }
}