import { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import baseTransitionStyles from './BaseTransitionStyles.module.css';
import filterTransitionStyles from './FilterTransition.module.css';
import notificationTransitionStyles from './components/Notification/NotificationTransition.module.css';
import ContactList from './components/ContactList/ContactList';
import styles from './App.module.css';
import Notification from './components/Notification/Notification';

export default class App extends Component {
  state = {
    contacts: [],
    isContactExists: false,
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = contactObj => {
    if (this.state.contacts.some(({ name }) => name === contactObj.name)) {
      this.setState({ isContactExists: true });
      setTimeout(() => {
        this.setState({ isContactExists: false });
      }, 3000);

      return;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contactObj],
      };
    });
    return this.setState({ isContactExists: false });
  };

  handleFilterChange = filter => {
    this.setState({
      filter,
    });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilteredContactsList = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { contacts, filter, isContactExists } = this.state;
    const filteredContactsList = this.getFilteredContactsList();
    return (
      <div>
        <CSSTransition
          in={isContactExists}
          timeout={250}
          unmountOnExit
          classNames={notificationTransitionStyles}
        >
          <Notification message="This contact already exists in your phonebook." />
        </CSSTransition>

        <CSSTransition
          in={true}
          appear={true}
          classNames={baseTransitionStyles}
          timeout={500}
          unmountOnExit
        >
          <h1 className={styles.title}>Phonebook</h1>
        </CSSTransition>
        <ContactForm onSubmit={this.handleSubmit} />
        {contacts.length > 0 && <h2 className={styles.title}>Contacts:</h2>}

        <CSSTransition
          in={contacts.length > 1}
          classNames={filterTransitionStyles}
          timeout={250}
          unmountOnExit
        >
          <Filter
            initialValue={filter}
            onFilterChange={this.handleFilterChange}
          />
        </CSSTransition>

        <CSSTransition
          in={filteredContactsList.length > 0}
          appear={true}
          classNames={baseTransitionStyles}
          timeout={500}
          unmountOnExit
        >
          <ContactList
            contacts={filteredContactsList}
            onDeleteButtonClick={this.handleDeleteContact}
          />
        </CSSTransition>
      </div>
    );
  }
}
