import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { mockedDataMap } from "../mocked_data/mockedJson";
import { mockedSearchResults } from "../mocked_data/mockedSearchJson";

// Define the shape of history entries
interface HistoryObject {
  command: string;
  result: string[][];
}

// Define the properties for the REPLInput component
interface REPLInputProps {
  history: HistoryObject[];
  setHistory: Dispatch<SetStateAction<HistoryObject[]>>;
  outputMode: string;
  setOutputMode: Dispatch<SetStateAction<string>>;
}

// The REPLInput component for handling user input and command execution
export function REPLInput(props: REPLInputProps) {
  // Manage the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // Manage the current count of times the button is clicked
  const [count, setCount] = useState<number>(0);
  // Manage the state of CSV data loading
  const [csvloaded, setcsvload] = useState<boolean>(false);
  const [csvdata, setCsvData] = useState<string[][]>([[]]);
  const [header, setHeader] = useState<string[]>([]);
  const [isHeader, setIsHeader] = useState<boolean>(false);
  const [filePathSearch, setFilePath] = useState<string>("");

  // Handle the submission of a command string
  function handleSubmit(commandString: string) {
    setCount(count + 1);
    const Output: string[][] = handleOutput(commandString);
    const newHistoryEntry: HistoryObject = {
      command: commandString,
      result: Output,
    };
    props.setHistory([...props.history, newHistoryEntry]);
    setCommandString("");

    // Handle the output for the given command
    function handleOutput(commandString: string) {
      const [command, ...args] = commandString.split(" ");
      if (command === "mode") {
        return handleModeCommand(args);
      } else if (command === "load_file") {
        return handleLoadCSV(args);
      } else if (command === "view") {
        return handleViewCommand(args);
      } else if (command === "search") {
        return handleSearchCommand(args);
      } else {
        return [["Invalid command: " + command]];
      }
    }

    // Handle the 'mode' command and switch the output mode
    function handleModeCommand(args: string[]) {
      if (args.length !== 0) {
        return [["Error - Mode Should Not Include Other Args"]];
      } else {
        let newMode;
        props.setOutputMode((prevMode) => {
          newMode = prevMode === "brief" ? "verbose" : "brief";
          return newMode;
        });
        return [[`Output mode switched to ${newMode}`]];
      }
    }
 

    // Handle the 'load_csv' command and load a CSV file
    function handleLoadCSV(args: string[]): string[][] {
      var isHeaderCopy: boolean = false;
      const [filePath, ...flags] = args;
      if (flags.length !== 0) {
        const [header, ...rest] = flags;
        if (header === "header" && rest.length === 0) {
          setIsHeader(true);
          isHeaderCopy = true;
        } else {
          return [
            [
              "Error - Extra Args after loadCSV that is not 'header'",
            ],
          ];
        }
      }
      if (filePath in mockedDataMap) {
        if (isHeaderCopy) {
          const [header, ...rest] = mockedDataMap[filePath];
          setHeader(header);
          setCsvData(rest);
        } else {
          setCsvData(mockedDataMap[filePath]);
        }
        setFilePath(filePath);
        setcsvload(true);
        return [["CSV Successfully Loaded"]];
      } else {
        setIsHeader(false);
        return [[`Error - ${filePath} not present`]];
      }
    }

    // Handle the 'view' command and display the loaded CSV data
    function handleViewCommand(args: string[]) {
      if (!csvloaded) {
        return [["Error - No CSV Loaded"]];
      }
      if (args.length !== 0) {
        return [["Error - View Should Not Include Other Args"]];
      } else {
        return [header, ...csvdata];
      }
    }

    // Handle the 'search' command and perform a search on the loaded CSV data
    function handleSearchCommand(args: string[]) {
      if (!csvloaded) {
        return [["Error - No CSV Loaded"]];
      }
      if (args.length < 2) {
        return [
          ["Error - Too Few Arguments, Add a <column> and <value> to search"],
        ];
      } else {
        const [column, value, ...rest] = args;
        if (rest.length !== 0) {
          return [["Error - Do Not Enter Args Other Than Column and Value"]];
        } else {
          return mockedSearchResults[filePathSearch + "-results"];
        }
      }
    }
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
