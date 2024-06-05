test('Check variable validity', () => {
    const todayDate_ms = new Date().getTime();
    expect(todayDate_ms).toBeDefined();
});