package com.barqsoft.flappyhunt;

import android.app.Activity;
import android.util.Log;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import java.net.URI;
import java.net.URISyntaxException;

/**
 * Created by BarQ on 2015-04-22.
 */
public class ObslugaWS {

    WebSocketClient mWebSocketClient;
    Activity aktywnosc;

    public ObslugaWS(Activity aktywnosc) {
        this.aktywnosc = aktywnosc;
    }

    public void connectWebSocket(String url) {
        URI uri;
        try {
            uri = new URI(url);
        } catch (URISyntaxException e) {
            e.printStackTrace();
            return;
        }

        mWebSocketClient = new WebSocketClient(uri) {
            @Override
            public void onOpen(ServerHandshake serverHandshake) {
                Log.i("Websocket", "Opened");
            }

            @Override
            public void onMessage(String s) {
                final String message = s;
                Log.i("Websocket", "message: " + message);
            }

            @Override
            public void onClose(int i, String s, boolean b) {
                Log.i("Websocket", "Closed " + s);
            }

            @Override
            public void onError(Exception e) {
                Log.i("Websocket", "Error " + e.getMessage());
            }
        };
        mWebSocketClient.connect();
    }

    public void sendMessage(String wiadomosc) {
        mWebSocketClient.send(wiadomosc);
    }

}
