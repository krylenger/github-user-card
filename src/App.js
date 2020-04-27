import React, { useState } from 'react';
import './App.css';
import axios from 'axios';


const Form = (props) => {

  const [inputValue, updateInputValue] = useState({
    username: ''
  });

  const handleInputChange = (event) => {
    updateInputValue({ username: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let url = `https://api.github.com/users/${inputValue.username}`;
    try {
      const userData = await props.fetchUser(url);
      props.addNewUser(userData);
      updateInputValue({ username: '' });
    } catch (error) {
      alert('Please, input valid gitHub username.')
      updateInputValue({ username: '' });
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        onChange={handleInputChange}
        value={inputValue.username}
        type='text'
        placeholder='username'
        required
      />
      <button > add card </button>
    </form>
  );
}

const Card = (userData) => {
  return (
    <div className='userCard'>
      <img src={userData.avatar_url} alt='userPhoto' />
      <div className='userName'>{userData.login}</div>
    </div>
  );
}

const Cardlist = ({ userData }) => {
  let profiles = userData.profiles;
  return (
    <div>
      {profiles.map((profile, index) => <Card key={index} {...profile} />)}
    </div>
  );
}

const App = () => {

  const [user, addUser] = useState({
    profiles: []
  });

  const fetchUser = async (url) => {
    const response = await axios.get(url);
    return response.data;
  }

  const addNewUser = (userData) => {
    addUser(prevUser => ({
      profiles: [...prevUser.profiles, userData],
    }));

  }

  return (
    <div className='App'>
      <Form fetchUser={fetchUser} addNewUser={addNewUser} />
      <Cardlist userData={user} />
    </div>
  );
}


export default App;






































// const Form = (props) => {

//   const [formState, setFormState] = useState({
//     userInput: ''
//   });

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       let url = `https://api.github.com/users/${formState.userInput}`;
//       const response = await props.axiosFetchProfile(url);
//       props.onSubmit(response.data);
//       setFormState({ userInput: '' });
//     } catch (error) {
//       alert('wrong user name, try again!');
//       setFormState({ userInput: '' });
//     }
//   }

//   const handleSearchChange = (event) => {
//     setFormState({ userInput: event.target.value })
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type='text'
//         value={formState.userInput}
//         onChange={handleSearchChange}
//         placeholder='enter username'
//         required
//       />
//       <button>add user</button>
//     </form>
//   )
// }

// const Card = (props) => {
//   return (
//     <div className='card'>
//       <img src={props.avatar_url} alt='profile' />
//       <div className='info'>
//         <div className='name'>{props.name}</div>
//         <div className='company'>{props.company}</div>
//       </div>
//     </div>
//   );
// }

// const Cardlist = (props) => {
//   return (
//     <div className='cardlist'>
//       {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
//     </div>
//   );
// }

// const App = () => {

//   const [appState, setAppState] = useState({
//     profiles: []
//   });

//   const addNewProfile = (profileData) => {
//     setAppState(prevState => ({
//       profiles: [...prevState.profiles, profileData]
//     }));
//   }

//   const axiosFetchProfile = async (url) => {
//     const response = await axios.get(url);
//     return response;
//   }

//   return (
//     <div>
//       <h1>github profile cards</h1>
//       <Form onSubmit={addNewProfile} axiosFetchProfile={axiosFetchProfile} />
//       <Cardlist profiles={appState.profiles} />
//     </div>
//   )

// }

// export default App;
