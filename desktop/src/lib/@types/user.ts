type UserPreferences = {
    darkMode: boolean;
    rememberMe: boolean;
    dbAutoStore: boolean;
    credentials: { email: string; password: string };
    // ui_font_size: SvelteUISize;
    // fontSize: number[];
}

export default UserPreferences
