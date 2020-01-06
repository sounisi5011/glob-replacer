export function replace(
    search: string,
    replace: string,
    subject: string,
): string | null {
    return [search, replace, subject].reduce(() => null, null);
}
