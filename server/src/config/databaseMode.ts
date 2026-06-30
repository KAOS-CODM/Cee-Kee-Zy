export let useMockDatabase = false

export function enableMockDatabase() {
    useMockDatabase = true
}

export function isUsingMockDatabase() {
    return useMockDatabase;
}