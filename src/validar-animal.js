import { ObterDados } from './utils/obter-dados.js';
import { TratarDado } from './utils/tratar-dado.js';

// import { ObterDados } from './utils/obter-dados';
// import { TratarDado } from './utils/tratar-dado';

class ValidarAnimal {

    constructor() {
        this.ANIMAIS = ObterDados.pegarAnimais()
        this.RECINTO = ObterDados.pegarRecintos()
    }

    // VERIFICACOES PARA ANIMAIS
    leao(quantidade) {
        const ANIMAL = "LEAO"
        let recintos = { "recintosViaveis": [] }
        let tamanho = this.ANIMAIS[ANIMAL].tamanho * quantidade

        this.RECINTO.forEach(elm => {
            if (tamanho <= elm.tamanho_total && this.biomaCorreto(elm.bioma, ANIMAL)) {

                let ocupacaoAtual = this.espacoAtual(elm, ANIMAL)

                let viavel = this.eViavel(elm.tamanho_total, tamanho, ocupacaoAtual)

                if (viavel && !this.haOutrosAnimais(elm.animais_existentes, ANIMAL)) {
                    recintos.recintosViaveis.push(`Recinto ${elm.id} (espaço livre: ${elm.tamanho_total - (tamanho + ocupacaoAtual)} total: ${elm.tamanho_total})`)
                }

            }
        })

        recintos = this.naoHaRecitoMsg(recintos)
        return recintos
    }

    leopardo(quantidade) {
        const ANIMAL = "LEOPARDO"
        let recintos = { "recintosViaveis": [] }
        let tamanho = this.ANIMAIS[ANIMAL].tamanho * quantidade

        this.RECINTO.forEach(elm => {
            if (tamanho <= elm.tamanho_total && this.biomaCorreto(elm.bioma, ANIMAL)) {
                let res = elm.animais_existentes.filter(animal => {
                    if (animal.animal != ANIMAL) return true
                });

                let ocupacaoAtual = this.espacoAtual(elm, ANIMAL)

                if (res.length == 0) {
                    recintos.recintosViaveis.push(`Recinto ${elm.id} (espaço livre: ${elm.tamanho_total - (tamanho + ocupacaoAtual)} total: ${elm.tamanho_total})`)
                }

            }
        })

        recintos = this.naoHaRecitoMsg(recintos)
        return recintos
    }

    hipopotamo(quantidade) {
        const ANIMAL = "HIPOPOTAMO"
        let recintos = { "recintosViaveis": [] }
        let tamanho = this.ANIMAIS[ANIMAL].tamanho * quantidade

        this.RECINTO.forEach(elm => {
            if (tamanho <= elm.tamanho_total && this.biomaCorreto(elm.bioma, ANIMAL)) {

                let ocupacaoAtual = this.espacoAtual(elm, ANIMAL)

                let viavel = this.eViavel(elm.tamanho_total, tamanho, ocupacaoAtual)

                if (elm.bioma != "savana e rio" && this.haOutrosAnimais(elm.animais_existentes, ANIMAL))
                    viavel = false

                if (viavel && !this.haAnimalCarnivoro(elm.animais_existentes)) {
                    recintos.recintosViaveis.push(`Recinto ${elm.id} (espaço livre: ${elm.tamanho_total - (tamanho + ocupacaoAtual)} total: ${elm.tamanho_total})`)
                }

            }
        })

        recintos = this.naoHaRecitoMsg(recintos)
        return recintos
    }

    gazela(quantidade) {
        const ANIMAL = "GAZELA"
        let recintos = { "recintosViaveis": [] }
        let tamanho = this.ANIMAIS[ANIMAL].tamanho * quantidade

        this.RECINTO.forEach(elm => {
            if (tamanho <= elm.tamanho_total && this.biomaCorreto(elm.bioma, ANIMAL)) {

                let ocupacaoAtual = this.espacoAtual(elm, ANIMAL)

                let viavel = this.eViavel(elm.tamanho_total, tamanho, ocupacaoAtual)

                if (viavel && !this.haAnimalCarnivoro(elm.animais_existentes))
                    recintos.recintosViaveis.push(`Recinto ${elm.id} (espaço livre: ${elm.tamanho_total - (tamanho + ocupacaoAtual)} total: ${elm.tamanho_total})`)

            }
        })

        recintos = this.naoHaRecitoMsg(recintos)
        return recintos
    }

    crocodilo(quantidade) {
        const ANIMAL = "CROCODILO"
        let recintos = { "recintosViaveis": [] }
        let tamanho = this.ANIMAIS[ANIMAL].tamanho * quantidade

        this.RECINTO.forEach(elm => {
            if (tamanho <= elm.tamanho_total && this.biomaCorreto(elm.bioma, ANIMAL)) {
                let res = elm.animais_existentes.filter(animal => {
                    if (animal.animal != ANIMAL) return true
                });

                let ocupacaoAtual = this.espacoAtual(elm, ANIMAL)

                if (res.length == 0) {
                    recintos.recintosViaveis.push(`Recinto ${elm.id} (espaço livre: ${elm.tamanho_total - (tamanho + ocupacaoAtual)} total: ${elm.tamanho_total})`)
                }

            }
        })

        recintos = this.naoHaRecitoMsg(recintos)
        return recintos
    }

    macacos(quantidade) {
        let recintos = { "recintosViaveis": [] }
        let tamanho = this.ANIMAIS["MACACO"].tamanho * quantidade

        this.RECINTO.forEach(elm => {
            if (tamanho <= elm.tamanho_total && this.biomaCorreto(elm.bioma, "MACACO")) {
                let animal_no_recinto = elm.animais_existentes

                let ocupacaoAtual = this.espacoAtual(elm, "MACACO")

                let viavel = this.eViavel(elm.tamanho_total, tamanho, ocupacaoAtual)

                console.log(animal_no_recinto)
                if (viavel && animal_no_recinto.length == 0 && quantidade > 1) {
                    recintos.recintosViaveis.push(`Recinto ${elm.id} (espaço livre: ${elm.tamanho_total - (tamanho + ocupacaoAtual)} total: ${elm.tamanho_total})`)
                    viavel = false
                }

                if (viavel && !this.haAnimalCarnivoro(animal_no_recinto)) {
                    recintos.recintosViaveis.push(`Recinto ${elm.id} (espaço livre: ${elm.tamanho_total - (tamanho + ocupacaoAtual)} total: ${elm.tamanho_total})`)
                    viavel = false
                }
            }
        });

        recintos = this.naoHaRecitoMsg(recintos)
        return recintos
    }

    // VERIFICACOES ATOMICAS
    haOutrosAnimais(animal_no_recinto, animal) {
        for (let i = 0; i < animal_no_recinto.length; i++) {
            let animalString = TratarDado.normalizarString(animal_no_recinto[i].animal)

            if (animalString != animal)
                return true
        }

        return false
    }

    eViavel(tamanho_total, tamanho, ocupacaoAtual) {
        if (tamanho_total - (tamanho + ocupacaoAtual) < 0) return false

        return true
    }

    naoHaRecitoMsg(recintos) {
        if (recintos.recintosViaveis.length == 0) return { "erro": "Não há recinto viável" }

        return recintos
    }
    haAnimalCarnivoro(animal_no_recinto) {
        for (let i = 0; i < animal_no_recinto.length; i++) {
            let animalString = TratarDado.normalizarString(animal_no_recinto[i].animal)
            let animal = this.ANIMAIS[animalString]

            if (animal.carnivoro)
                return true
        }
        return false
    }

    biomaCorreto(bio, animal) {
        let biomas = this.ANIMAIS[TratarDado.normalizarString(animal)].bioma

        for (let i = 0; i < biomas.length; i++) {
            if (bio.includes(biomas[i]))
                return true
        }
    }

    espacoAtual(recinto, animal) {
        let animal_no_recinto = recinto.animais_existentes

        let espaco = 0

        for (let i = 0; i < animal_no_recinto.length; i++) {
            let animalString = TratarDado.normalizarString(animal_no_recinto[i].animal)
            let animalLocal = this.ANIMAIS[animalString]

            espaco += animal_no_recinto[i].quantidade * animalLocal.tamanho

            if (TratarDado.normalizarString(animal_no_recinto[i].animal) != TratarDado.normalizarString(animal))
                espaco++
        }
        return espaco
    }

    animalEstaListado(animal) {
        let animals = Object.keys(this.ANIMAIS)

        return !animals.includes(animal)
    }
}

export { ValidarAnimal as ValidarAnimal };
