// theme.js
// Uchiha Theme Configuration

export const themeSettings = {
    primaryColor: '#FF0000', // Uchiha Red
    secondaryColor: '#000000', // Uchiha Black
    backgroundColor: '#FFFFFF', // Background Color
    fontFamily: 'Arial, sans-serif',
    borderRadius: '5px',
};

export const stylingFunctions = {
    getButtonStyle: () => {
        return {
            backgroundColor: themeSettings.primaryColor,
            color: themeSettings.secondaryColor,
            borderRadius: themeSettings.borderRadius,
            fontFamily: themeSettings.fontFamily,
            padding: '10px 20px',
            border: 'none',
        };
    },
    getCardStyle: () => {
        return {
            backgroundColor: themeSettings.backgroundColor,
            border: `1px solid ${themeSettings.primaryColor}`,
            borderRadius: themeSettings.borderRadius,
            padding: '15px',
            margin: '10px 0',
        };
    },
};