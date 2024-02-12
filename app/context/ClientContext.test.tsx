import {act, render} from '@testing-library/react';
import {ClientContext, ClientProvider} from './ClientContext';
import {ClientType} from "../enums/clientType";
import IClient from "@models/client";
import {GetClient} from "../clients/clientFactory";

// Mock fetch
// @ts-ignore There isn't a response type in NodeJS so we can ignore the typing
global.fetch = jest.fn(() =>
    Promise.resolve({
        text: () => Promise.resolve(ClientType.Mock), // replace with the actual client type
    })
);

describe('ClientProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<>
        <ClientProvider>
            <div>test</div>
        </ClientProvider>
        </>);
  });

  it('sets client correctly', async () => {
    let client: IClient | null = null;
    await act(async () => {
      render(
        <ClientProvider>
          <ClientContext.Consumer>
            {(value) => {
              client = value;
              return null;
            }}
          </ClientContext.Consumer>
        </ClientProvider>
      );
    });

    expect(client).toEqual(GetClient(ClientType.Mock)); // replace with the actual client type
  });
});
