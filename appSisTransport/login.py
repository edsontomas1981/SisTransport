from kivy.lang import Builder
from kivymd.app import MDApp



KV = '''
BoxLayout:
    orientation: 'vertical'

    MDTopAppBar:
        title: "MDTopAppBar"
        right_action_items: [["dots-vertical"]]

    BoxLayout:
        spacing: dp(10)
        padding: dp(10)

        MDTextField:
            hint_text: "Placa AAA9A999"
            mode: "round"
            max_text_length: .5
            helper_text: "Placa"
            size_hint_x: .3

        MDTextField:
            hint_text: "Manifesto"
            mode: "round"
            max_text_length: 25
            helper_text: "Manifesto"
            size_hint_x: .5
            size_hint_y: .1
            pos_hint: {"center_x": .5, "center_y": .50}
'''

class MainApp(MDApp):
    def build(self):
        return Builder.load_string(KV)

    def callback(self, button):
        print(button)

MainApp().run()
