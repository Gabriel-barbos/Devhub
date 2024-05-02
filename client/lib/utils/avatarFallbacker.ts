const avatarFallbacker = (name: String) => {
    // Separa o nome em palavras

    const words = name.split(' ');

    // Inicializa a variável para armazenar as iniciais
    let initials = '';

    // Itera sobre cada palavra para obter a inicial
    for (const word of words) {
        // Adiciona a primeira letra da palavra às iniciais
        initials += word[0].toUpperCase();

        // Se já tiver 3 letras, termina o loop
        if (initials.length === 3) {
            break;
        }
    }

    return initials;
}

export default avatarFallbacker;