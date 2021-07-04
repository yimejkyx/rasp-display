module.exports = {
    makers: [
        {
          name: "@electron-forge/maker-squirrel",
          config: {
            loadingGif: "build/icon2.gif",
            setupIcon: "build/icon.ico"
          }
        },
      ],
}