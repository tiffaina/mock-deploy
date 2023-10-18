export const mockedDataMap: Record<string, any[][]> = {

  // search 1 20
  'normal.csv': [
    ["name", "age"],
    ["Jay", "21"],
    ["Blake", "20"],
    ["Tiffney", "20"]
  ],
  // search grade B
  'gradeBook.csv': [
      ["Student ID", "Name", "Grade", "Gender"],
      ["1001", "Alice", "A", "Female"],
      ["1002", "Bob", "C", "Male"],
      ["1003", "Charlie", "B", "Male"],
      ["1004", "David", "B", "Male"],
      ["1004", "Maxine", "B", "Female"]
  ],
  // use this csv to test no results found
  // search 5 100
  'price.csv': [
      ["Product", "Price", "Sold"],
      ["Widget", "10.99", "100"],
      ["Widget", "10.99", "100"],
      ["Gadget", "19.99", "75"],
      ["Doodad", "5.49", "200"],
      ["Thingamajig", "15.79", "50"],
  ],
  // csv data with no header
  // search 3 chicago
  'noHeader.csv': [
  ["1", "Alice", "25", "New York"],
  ["2", "Bob", "30", "Los Angeles"],
  ["3", "Charlie", "28", "Chicago"],
  ["4", "David", "22", "San Francisco"],
  ["5", "Eve", "29", "Miami"],
  ["6", "Max", "22", "Chicago"],
  ],
  // Use to test empty csv
  'empty.csv':[
    []
  ],
  // csv that produces no results 
  // search 0 twix
  'candy.csv': [
    ["CandyName", "Flavor", "Price", "Stock"],
    ["Chocolate Bar", "Milk Chocolate", "$1.25", "100"],
    ["Gummy Bears", "Mixed Fruit", "$0.75", "250"],
    ["Lollipop", "Cherry", "$0.50", "150"],
    ["Jelly Beans", "Assorted", "$1.00", "200"],
    ["Peppermint Candy", "Peppermint", "$0.30", "300"],
    ["Licorice Twists", "Black Licorice", "$0.80", "100"],
  ],
};