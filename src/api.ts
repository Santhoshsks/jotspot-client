import LoginProps from './models/credential';
import { NoteObject } from './models/note';
import UserDetails from './models/userdetails';


export const fetchNotes = async (): Promise<NoteObject[]> => {
  
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/api/notes',{
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'ngrok-skip-browser-warning': 'true',}
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} this one ${response.statusText}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format: not JSON');
      }
  
      return await response.json();
    } catch (error) {

      throw error;
    }
  };
  
  
export const login = async(credentials:LoginProps):Promise<string> =>{
  try {
    const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const token = data.token;
    localStorage.setItem('authToken', token);
    return token;
  } catch (error) {
    throw error;
  }}

  export const register = async(userDetails:UserDetails):Promise<string> =>{
    try {
      console.log('json'+JSON.stringify(userDetails))
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(userDetails),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('authToken', token);
      console.log('data',data)
      return token;
    } catch (error) {
      console.log('Failed to register:', error);
      throw error;
    }}


export const addNote = async (newNote: NoteObject): Promise<NoteObject> => {
    console.log(JSON.stringify(newNote))
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:8080/api/notes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(newNote),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Failed to add note:', error);
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
            'Authorization': `Bearer ${authToken}`,
            'ngrok-skip-browser-warning': 'true',}
      
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log('Failed to delete note:', error);
    throw error;
  }
};

export const editNote = async (id: string, editedNote: NoteObject): Promise<NoteObject> => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(editedNote),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log('Failed to edit note:', error);
    throw error;
  }
};

export const searchNotes = async (keyword : string): Promise<NoteObject[]> => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(`http://localhost:8080/api/notes/search/${keyword}`,{
      headers: {
          'Authorization': `Bearer ${authToken}`,
          'ngrok-skip-browser-warning': 'true',}
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format: not JSON');
    }

    return await response.json();
  } catch (error) {
    console.log('Failed to fetch notes:', error);
    throw error;
  }
};

