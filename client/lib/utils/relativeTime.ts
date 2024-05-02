function relativeTime(data: Date): string {
    data = new Date(data);
    const agora = new Date();
    const diferencaEmMilissegundos = agora.getTime() - data.getTime();
    const segundos = Math.floor(diferencaEmMilissegundos / 1000);

    const intervaloEmMinutos = Math.floor(segundos / 60);
    if (intervaloEmMinutos < 1) {
        return 'agora mesmo';
    }
    if (intervaloEmMinutos === 1) {
        return 'há 1 minuto atrás';
    }
    if (intervaloEmMinutos < 60) {
        return `há ${intervaloEmMinutos} minutos atrás`;
    }

    const intervaloEmHoras = Math.floor(intervaloEmMinutos / 60);
    if (intervaloEmHoras === 1) {
        return 'há 1 hora atrás';
    }
    if (intervaloEmHoras < 24) {
        return `há ${intervaloEmHoras} horas atrás`;
    }

    const intervaloEmDias = Math.floor(intervaloEmHoras / 24);
    if (intervaloEmDias === 1) {
        return 'ontem';
    }
    if (intervaloEmDias < 7) {
        return `há ${intervaloEmDias} dias atrás`;
    }

    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
}

export default relativeTime;