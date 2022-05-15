import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import App from './App';
import Server from 'webpack-dev-server';

describe('App', () => {
  test('shopping list', () => {
    render(<App />);

    //check page load
    screen.getByText(/shopping list/i);

    //grab input and button
    const newItem = screen.getByRole('textbox');
    const addToList = screen.getByRole('button', { name: /add to list/i });

    //enter text to input, press button
    userEvent.type(newItem, 'Pizza Pizza');
    userEvent.click(addToList);

    //search for new list item.
    screen.getByRole('listitem');
    screen.getByText(/pizza pizza/i);

    //manipulate new list item
    //try to delete
    const del = screen.getByRole('button', { name: /delete/i });
    userEvent.click(del);
    expect(screen.getByText(/pizza pizza/i)).toBeInTheDocument();

    //edit input
    const edit = screen.getByRole('button', { name: /edit/i });
    userEvent.click(edit);
    const editText = screen.getByLabelText('list-item');
    userEvent.type(editText, ' Pizza');
    const save = screen.getByRole('button', { name: /save/i });
    userEvent.click(save);

    //check for updated list item
    screen.getByText(/pizza pizza pizza/i);

    //delete list item.
    const checked = screen.getByRole('checkbox');
    checked.ariaChecked = false;
    userEvent.click(checked);
    checked.ariaChecked = true;
    userEvent.click(del);
    expect(screen.queryByText(/pizza pizza pizza/i)).toBeNull();

    //check count and delete all
    //check initial counter
    const counter = screen.getByLabelText('list-counter');
    expect(counter.textContent).toEqual('0');

    //add new list item
    userEvent.type(newItem, 'HotDog');
    userEvent.click(addToList);
    expect(counter.textContent).toEqual('1');

    //add second list item
    userEvent.type(newItem, 'Hamburger');
    userEvent.click(addToList);
    expect(counter.textContent).toEqual('2');

    //clear list
    const clearList = screen.getByText(/clear carts/i);
    userEvent.click(clearList);
    expect(counter.textContent).toEqual('0');
  });
});
