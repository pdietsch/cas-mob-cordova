package ch.hsr.casmobile.beep;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.media.ToneGenerator;
import android.media.AudioManager;

/**
 * This class echoes a string called from JavaScript.
 */
public class Beep extends CordovaPlugin {

    private ToneGenerator toneGen1;
    public Beep(){
        toneGen1 = new ToneGenerator(AudioManager.STREAM_MUSIC, 100);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("beep")) {
            int duration =  args.getInt(0);
            int type =  args.getInt(1);
            this.beep(duration,type, callbackContext);
            return true;
        }
        return false;
    }

    private void beep(int duration,int type, CallbackContext callbackContext) {
        toneGen1.startTone(type,duration);

    }
}
