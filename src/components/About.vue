<template>
    <v-card>
        <v-card-text>
            <p class="text-h6">
                Alfred Wallace Rugby is a calculator for the rugby union world rankings
                based on the rules defined by World Rugby.
            </p>
            <v-divider class="mb-2"></v-divider>
            <p>
                <span class="text-subtitle-1">The formula is :</span> <br>
                <br>
                R1 : the first team (T1) rank<br>
                R2 : the second team (T2) rank<br>
                If T1 plays at home, then H = 3, else H = 0<br>
                RD = R1 + H - R2<br>
                If RD &gt; 10, then RD = 10<br>
                If RD &lt; -10, then RD = -10<br>
                <br>
                S1 : the score of T1<br>
                S2 : the score of T2<br>
                SD = S1 - S2<br>
                If SD &gt; 0, then P = (-10 - RD) / 10<br>
                If SD &lt; 0, then P = (10 - RD) / 10<br>
                If SD = 0, then P = -RD / 10<br>
                <br>
                If |SD| > 15, then P = 1.5 * P<br>
                If it's a World Cup match, then P = 2 * P<br>
                <br>
                P is now the number of points that should be exchanged, add it to the rank of the winning team and
                substract it from the rank of the losing one.
            </p>
            <v-divider class="mb-2"></v-divider>
            <p class="text-subtitle-1">
                The official rules are explained <a href="https://www.world.rugby/rankings/explanation" target="_blank">on the official website</a>, or on the
                <a href="https://en.wikipedia.org/wiki/World_Rugby_Rankings#Current_calculation_method" target="_blank">english wikipedia page</a>.<br>
                However, the formula is much easier to understand on the
                <a href="https://fr.wikipedia.org/wiki/Classement_World_Rugby_des_%C3%A9quipes_nationales_de_rugby_%C3%A0_XV#R%C3%A8gle_de_calcul_des_points_%C3%A9chang%C3%A9s" target="_blank">french</a>
                or <a href="https://it.wikipedia.org/wiki/Piazzamento_World_Rugby#Metodo_di_calcolo" target="_blank">italian</a> wikipedia pages.
            </p>
            <v-divider class="mb-2"></v-divider>
            <p class="text-subtitle-1">
                There can be some slight differences (0,01) between the results of my calculator and the official updates on the World Rugby website. This is due to an arbitrary rounding or miscalculation on their part.<br>
                You can see in the very example they produce that they are making a mistake by stating that Wales (76.92) and Scotland (76.36) exchanged 0.64 points and ending up having Wales at 77.57 = 76.92 + 0.65.
            </p>
            <p class="text-subtitle-1">Maybe someone will notice one day ¯\_( ^ . ^ )_/¯</p>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: 'About',
};
</script>
