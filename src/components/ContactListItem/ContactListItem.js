import PropTypes from 'prop-types';
import styles from './ContactListItem.module.css';

const ContactListItem = ({ idx, contact, onDeleteButtonClick }) => {
  return (
    <li key={contact.id} className={idx % 2 === 0 ? styles.even : styles.odd}>
      <span>
        {contact.name}: {contact.number}
      </span>
      <button
        type="button"
        id={contact.id}
        className={styles.deleteButton}
        onClick={e => onDeleteButtonClick(e.target.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactListItem;

ContactListItem.propTypes = PropTypes.shape({
  idx: PropTypes.number.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
}).isRequired;
