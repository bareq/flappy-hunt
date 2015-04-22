package com.barqsoft.flappyhunt;

import android.content.Context;
import android.net.nsd.NsdManager;
import android.net.nsd.NsdServiceInfo;
import android.os.AsyncTask;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import java.io.IOException;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.net.UnknownHostException;


public class SerwerListActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_serwer_list);
        getSupportActionBar().setTitle("Wyszukiwanie serwera");
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
            new DownloadFilesTask().execute("das");
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    private void scanPort(){
        try {
            Socket socket = new Socket();
            InetAddress inetAddress = InetAddress.getByName("192.168.0.10");
            SocketAddress address = new InetSocketAddress(inetAddress, 135);
            socket.connect(address, 100);
            //OPEN
            System.out.println("OPEN");
            socket.close();
        } catch (UnknownHostException e) {
            //WRONG ADDRESS
            System.out.println("WRONG");
        } catch (SocketTimeoutException e) {
            //TIMEOUT
        } catch (IOException e) {
            //CLOSED
            System.out.println("CLOSED");
        }
    }

    private class DownloadFilesTask extends AsyncTask<String, Integer, Void> {
        protected Void doInBackground(String... adress) {
            scanPort();
            //int count = urls.length;
            long totalSize = 0;
            //for (int i = 0; i < count; i++) {
                //totalSize += Downloader.downloadFile(urls[i]);
                //publishProgress((int) ((i / (float) count) * 100));
                // Escape early if cancel() is called
                //if (isCancelled()) break;
            return null;
        }
            //return totalSize;

        protected void onProgressUpdate(Integer... progress) {
            //setProgressPercent(progress[0]);
        }

        protected void onPostExecute() {
            //showDialog("Downloaded " + result + " bytes");
        }
    }

}
