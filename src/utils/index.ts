
export const formatAccountNumber = (accountNumber: string) => {
    const formattedAccountNumber = accountNumber.split(' ').map(number => parseInt(number)).filter(number => number != 0).join('-')
    return formattedAccountNumber;
}

export const formatIban = (iban: string) => {
    const formattedIban = iban.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    return formattedIban;
}

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('cs-CZ', { year: 'numeric', month: '2-digit', day: '2-digit' });
}