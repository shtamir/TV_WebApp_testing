// data-sync.js - Google Sheets data synchronization for Yakinton 46 application

// Configuration for Google Sheets
const sheetsConfig = {
  messagesSheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRm_3aSAL3tnmyOHuAXMIc0IF6V3MlR-CmB3rmebHON0V_V3r3ido3hdq2qr_ByTbIayW1AKZjp45IL/pub?gid=0&single=true&output=csv',
  todoSheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRm_3aSAL3tnmyOHuAXMIc0IF6V3MlR-CmB3rmebHON0V_V3r3ido3hdq2qr_ByTbIayW1AKZjp45IL/pub?gid=1&single=true&output=csv', // Assuming todos are on a different sheet
  maxMessages: 10,
  maxTodoItems: 7
};

// Fetch team messages from Google Sheets
function fetchMessagesFromGoogleSheet() {
  // Show loading state
  document.getElementById('messagesBox').innerHTML = '<div class="loading-indicator">Loading messages...</div>';
  
  fetch(sheetsConfig.messagesSheetUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Google Sheets responded with status ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      const lines = data.split('\n'); 
      // For each line, take only the first column
      const firstColumnValues = lines
        .map(line => line.split(',')[0])  // split by comma, take first cell
        .map(value => value.trim())       // remove extra whitespace
        .filter(value => value.length > 0) // remove any empty lines
        .slice(1, sheetsConfig.maxMessages + 1); // Skip header, take up to max messages

      // Display messages with a header
      const messagesHTML = `
        <div style="font-weight: bold; margin-bottom: 10px;">הודעות:</div>
        ${firstColumnValues.join('<br>')}
      `;
      document.getElementById('messagesBox').innerHTML = messagesHTML;
    })
    .catch(error => {
      console.error('Error fetching sheet data:', error);
      showError('messagesBox', 'Unable to load messages');
    });
}

// Fetch todo list items from Google Sheets
function fetchTodoListFromGoogleSheet() {
  // Show loading state
  document.getElementById('todoListBox').innerHTML = '<div class="loading-indicator">Loading todo list...</div>';
  
  // For this example, we'll use the same sheet URL but you should use a different sheet or tab in production
  fetch(sheetsConfig.todoSheetUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Google Sheets responded with status ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      const lines = data.split('\n');
      
      // For each line, take only the first column
      const todoItems = lines
        .map(line => line.split(',')[0])  // split by comma, take first cell
        .map(value => value.trim())       // remove extra whitespace
        .filter(value => value.length > 0) // remove any empty lines
        .slice(1, sheetsConfig.maxTodoItems + 1); // Skip header, take up to max items

      // If no items, show a message
      if (todoItems.length === 0) {
        document.getElementById('todoListBox').innerHTML = 'No todo items';
        return;
      }

      // Display todo items with a header and checkbox styling
      const todoHTML = `
        <div style="font-weight: bold; margin-bottom: 10px;">Todo List:</div>
        ${todoItems.map(item => `☐ ${item}`).join('<br>')}
      `;
      document.getElementById('todoListBox').innerHTML = todoHTML;
    })
    .catch(error => {
      console.error('Error fetching todo data:', error);
      showError('todoListBox', 'Unable to load todo list');
    });
}
