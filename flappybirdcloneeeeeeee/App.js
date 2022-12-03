import { GLView } from "expo";
import * as React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";

//web3 shit

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { ConnectButton } from "@rainbow-me/rainbowkit";

//till here

import DisableBodyScrollingView from "./components/DisableBodyScrollingView";
// import ExpoButton from './components/ExpoButton';
// import GithubButton from './components/GithubButton';
import KeyboardControlsView from "./components/KeyboardControlsView";
import logyo from "./components/logyo";
import Game from "./src/game";

logyo("https://twitter.com/vimarshtweets");
export default class App extends React.Component {
  state = {
    score: 0,
  };
  render() {
    const { style, ...props } = this.props;

    const { chains, provider } = configureChains(
      [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
      [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
    );
    const { connectors } = getDefaultWallets({
      appName: "on chain game saves",
      chains,
    });
    const wagmiClient = createClient({
      autoConnect: true,
      connectors,
      provider,
    });

    return (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          {/* <View
            style={[
              {
                width: "100vw",
                height: "10vh",
                overflow: "hidden",
                align: "left",
              },
            ]}
          >
            <ConnectButton />
          </View> */}
          <View
            style={[
              { width: "100vw", height: "100vh", overflow: "hidden" },
              style,
            ]}
          >
            <DisableBodyScrollingView>
              <KeyboardControlsView
                onKeyDown={({ code }) => {
                  if (this.game) {
                    if (code === "Space") {
                      this.game.onPress();
                    }
                  }
                }}
              >
                <TouchableWithoutFeedback
                  onPressIn={() => {
                    if (this.game) this.game.onPress();
                  }}
                >
                  <GLView
                    style={{ flex: 1, backgroundColor: "black" }}
                    onContextCreate={(context) => {
                      this.game = new Game(context);
                      this.game.onScore = (score) => this.setState({ score });
                    }}
                  />
                </TouchableWithoutFeedback>

                <ConnectButton />

                <Score>{this.state.score}</Score>
              </KeyboardControlsView>
            </DisableBodyScrollingView>
            {/* <ExpoButton /> */}
            {/* <GithubButton /> */}

          </View>
        </RainbowKitProvider>
      </WagmiConfig>
    );
  }
}

const Score = ({ children }) => (
  <Text
    style={{
      position: "absolute",
      left: 0,
      top: "10%",
      right: 0,
      textAlign: "center",
      color: "white",
      fontSize: 48,
      userSelect: "none",
    }}
  >
    {children}
  </Text>
);
