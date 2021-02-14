import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './ContactList.module.css';
import contactListTransition from './ContactListTransition.module.css';
import ContactListItem from '../ContactListItem/ContactListItem';

export default function ContactList({ contacts, onDeleteButtonClick }) {
  return (
    <TransitionGroup component="ul" className={styles.contactsList}>
      {contacts.map((contact, idx) => (
        <CSSTransition
          key={contact.id}
          classNames={contactListTransition}
          timeout={250}
        >
          <ContactListItem
            idx={idx}
            contact={contact}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

ContactList.propTypes = PropTypes.shape({
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
}).isRequired;
