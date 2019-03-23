import { Component, h } from 'hyperapp';
import { Box } from '../containers/Box';
import { Section } from '../containers/Section';

export const LoginView: Component = () => (
  <Box>
    <Section header="Login">
      <p>Login here.</p>
    </Section>
  </Box>
);
