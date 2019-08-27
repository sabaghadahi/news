<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#"><img src="~/assets/img/126309.png" class="width"> </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-button variant="danger" @click="googleSignout">logout</b-button>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
        </b-collapse>
      </b-navbar>
    </div>
    <div>
      <vue-highcharts :options="options" ref="lineCharts"></vue-highcharts>
      <button @click="load">load</button>
    </div>
  </div>
</template>

<script>
    import VueHighcharts from 'vue2-highcharts'
    import firebase from 'firebase'
    const asyncData = {
        name: 'Tokyo',
        marker: {
            symbol: 'square'
        },
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
            y: 26.5,
            marker: {
                symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
            }
        }, 23.3, 18.3, 13.9, 9.6]
    }
    export default{
        components: {
            VueHighcharts
        },
        data(){
            return{
                options: {
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'Monthly Average Temperature'
                    },
                    subtitle: {
                        text: 'Source: WorldClimate.com'
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    yAxis: {
                        title: {
                            text: 'Temperature'
                        },
                        labels: {
                            formatter: function () {
                                return this.value + '°';
                            }
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                radius: 4,
                                lineColor: '#666666',
                                lineWidth: 1
                            }
                        }
                    },
                    series: []
                }
            }
        },
        methods: {
            load(){
                let lineCharts = this.$refs.lineCharts;
                lineCharts.delegateMethod('showLoading', 'Loading...');
                setTimeout(() => {
                    lineCharts.addSeries(asyncData);
                    lineCharts.hideLoading();
                }, 2000)
            },
            googleSignout () {
                this.provider = new firebase.auth.GoogleAuthProvider()
                firebase.auth().signOut().then(result => {
                    // store the user ore wathever
                    this.$router.push('/')
                }).catch(e => {
                    this.$snotify.error(e.message)
                    console.log(e)
                })

                }
            }
    }
</script>
<style scoped>
  .width{
    width: 50px;
  }
</style>
