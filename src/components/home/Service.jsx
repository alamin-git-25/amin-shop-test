import React from 'react'
import Container from '../custom-ui/Container'

export default function Service() {
    return (
        <Container className="my-12">
            <div className="grid auto-rows-min   gap-4 md:grid-cols-2">
                <div className="aspect-video shad rounded-xl bg-muted/50" />
                <div className="aspect-video shad rounded-xl bg-muted/50" />
            </div>
        </Container>
    )
}
