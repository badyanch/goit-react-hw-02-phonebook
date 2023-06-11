import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { GlobalStyle } from 'components/GlobalStyle';
import { getNormalizedName } from 'utils';
import * as S from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChangeFilter = e => {
    const { value } = e.target;

    this.setState({ filter: value });
  };

  handleAddContact = ({ name, number }) => {
    const normalizedName = getNormalizedName(name);

    if (this.contactValidationByName(normalizedName)) {
      alert(`${normalizedName} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name: normalizedName, number };

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  handleDeleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  contactValidationByName(newName) {
    const { contacts } = this.state;
    return contacts.some(({ name }) => name === newName);
  }

  getVisibleContacts() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <S.Container>
        <GlobalStyle />

        <S.PrimaryTitle>Phonebook</S.PrimaryTitle>
        <ContactForm onSubmit={this.handleAddContact} />

        <S.SecondaryTitle>Contacts</S.SecondaryTitle>
        <Filter value={filter} onChangeFilter={this.handleChangeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </S.Container>
    );
  }
}
