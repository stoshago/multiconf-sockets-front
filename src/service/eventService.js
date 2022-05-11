import React, {createContext, useContext, useEffect, useState} from 'react';
import PubSub from 'pubsub-js';
import {getRandomHost} from "./elbService";

const EventServiceContext = createContext({
    subscribe: null,
    unsubscribe: null,
    error: null,
    connected: false,
});

const EventService = ({children, auth}) => {
    const [error, setError] = useState();
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (!auth) {
            return;
        }
        // Only path and protocol field can be specified, but no headers in place.
        const ws = new window.WebSocket(`ws://${getRandomHost()}:8080/web-socket?token=${auth.token}`);

        // Receive and publish incoming messages from websocket
        ws.addEventListener('message', function (messageEvent) {
            const message = JSON.parse(messageEvent.data);
            const topic = message?.topic ?? null;
            console.log(`Received event '${topic}' message:`, message, new Date());
            return PubSub.publish(topic, message.data);
        });

        ws.addEventListener('open', function (event) {
            setConnected(true);
            setError(undefined);
            console.debug("WS CONNECTION OPENED", event, ws)
        });

        ws.addEventListener('error', function (event) {
            console.debug("WS CONNECTION ERROR", event)
        });

        ws.addEventListener('close', function (event) {
            setConnected(false);
            console.debug("WS CONNECTION CLOSED", event)
        });

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [auth]);

    const eventServiceInterface = {
            subscribe: (namespace, callback) => {
                return PubSub.subscribe(namespace, callback);
            },
            unsubscribe: (token) => {
                return PubSub.unsubscribe(token);
            },
            error,
            connected,
        }
    ;

    return (
        <EventServiceContext.Provider value={eventServiceInterface}>
            {children}
        </EventServiceContext.Provider>
    );
}

const useEventService = (namespace, callback) => {
    const eventService = useContext(EventServiceContext);

    useEffect(() => {
        const token = eventService.subscribe(namespace, callback);

        return () => {
            eventService.unsubscribe(token);
        };
    }, [namespace, callback, eventService]);

    return eventService;
}

export {EventServiceContext, EventService, useEventService};
