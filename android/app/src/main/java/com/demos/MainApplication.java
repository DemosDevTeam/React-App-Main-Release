package com.demos;

import android.app.Application;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.BV.LinearGradient.LinearGradientPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

 protected static CallbackManager getCallbackManager() {
   return mCallbackManager;
 }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNGoogleSigninPackage(),
            new ReactNativeYouTube(),
            new RNGoogleSigninPackage(),
            new FBSDKPackage(),
            new LinearGradientPackage(),
            new RNSpinkitPackage(),
            new ReactNativeYouTube(),
            new RNGoogleSigninPackage(),
            new FBSDKPackage(mCallbackManager),
            new LinearGradientPackage(),
            new RNSpinkitPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
