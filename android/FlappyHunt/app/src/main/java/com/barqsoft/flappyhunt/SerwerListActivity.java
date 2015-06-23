package com.barqsoft.flappyhunt;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.net.DhcpInfo;
import android.net.wifi.WifiManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.ListView;
import android.widget.ProgressBar;

import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;
import java.net.SocketTimeoutException;
import java.net.UnknownHostException;


public class SerwerListActivity extends ActionBarActivity {

    ObslugaWS obslugaWS;
    ProgressBar progressBar;
    ListView listaSerwerow;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_serwer_list);
        progressBar = (ProgressBar) findViewById(R.id.progressBar);
        listaSerwerow = (ListView) findViewById(R.id.listView);
        getSupportActionBar().setTitle("Wyszukiwanie serwera");
        //obslugaWS = new ObslugaWS(this);
        //obslugaWS.connectWebSocket("ws://192.168.0.15:33333");
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_serwer_list, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_refresh) {
            progressBar.setVisibility(View.VISIBLE);
            new SkanowanieSieciTask().execute();
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    private void scanPort() {
        WifiManager wifii = (WifiManager) getSystemService(Context.WIFI_SERVICE);
        DhcpInfo d = wifii.getDhcpInfo();
//
        int ip = d.ipAddress;
        String ipStr =
                String.format("%d.%d.%d.",
                        (ip & 0xff),
                        (ip >> 8 & 0xff),
                        (ip >> 16 & 0xff));
        Log.i("Scan", ipStr);
        for (int i = 1; i < 255; i++) {


            try {
                Socket socket = new Socket();
                InetAddress inetAddress = InetAddress.getByName(ipStr + String.valueOf(i));
                SocketAddress address = new InetSocketAddress(inetAddress, 33333);
                socket.connect(address, 100);
                //OPEN
                System.out.println("OPEN " + ipStr + String.valueOf(i));
                socket.close();
                new AlertDialog.Builder(this).setTitle("Znaleziono serwer pod adresem: " + ipStr).show();


            } catch (UnknownHostException e) {
                //WRONG ADDRESS
                System.out.println("WRONG " + ipStr + String.valueOf(i));
            } catch (SocketTimeoutException e) {
                //TIMEOUT
                System.out.println("TIMEOUT " + ipStr + String.valueOf(i));
            } catch (IOException e) {
                //CLOSED
                System.out.println("CLOSED " + ipStr + String.valueOf(i));
            }
        }
    }

    public void goToGameScreen(View view) {
        Intent intent = new Intent(this, GameActivity.class);
        startActivity(intent);
    }

    private class SkanowanieSieciTask extends AsyncTask<Void, Integer, Void> {

        protected Void doInBackground(Void... adress) {
            scanPort();
            return null;
        }

        protected void onProgressUpdate(Integer... progress) {
            //setProgressPercent(progress[0]);
        }

        protected void onPostExecute(Void result) {
            //showDialog("Downloaded " + result + " bytes");
            System.out.println("Koniec szukania");
            progressBar.setVisibility(View.INVISIBLE);
        }
    }

}
