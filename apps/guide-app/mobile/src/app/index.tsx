import { useRef, useEffect } from 'react';
import { BackHandler, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, type WebViewNavigation } from 'react-native-webview';
import { WEB_URL } from '@/constants/webUrl';

export default function WebScreen() {
  const webViewRef = useRef<WebView>(null);
  const canGoBackRef = useRef(false);

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const onBackPress = () => {
      if (canGoBackRef.current) {
        webViewRef.current?.goBack();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, []);

  const onNavigationStateChange = (state: WebViewNavigation) => {
    canGoBackRef.current = state.canGoBack;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <WebView
        ref={webViewRef}
        source={{ uri: WEB_URL }}
        style={styles.webview}
        onNavigationStateChange={onNavigationStateChange}
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
